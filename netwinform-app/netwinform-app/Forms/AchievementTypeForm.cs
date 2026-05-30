using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using netwinform_app.DTOs;
using netwinform_app.Models;
using netwinform_app.Services.AchievementType;

namespace netwinform_app.Forms
{
    public partial class AchievementTypeForm : Form
    {
        // ── Controls ─────────────────────────────────────────────────────────
        private Label _lblTitle;
        private DataGridView _grid;
        private Panel _pnlDetail;

        private TextBox _txtCode;
        private TextBox _txtName;
        private TextBox _txtDescription;
        private ComboBox _cmbRequirementType;
        private NumericUpDown _nudRequirementValue;
        private PictureBox _picIcon;
        private Button _btnBrowseIcon;
        private Label _lblCurrentIcon;

        private Button _btnNew;
        private Button _btnSave;
        private Button _btnDelete;
        private Button _btnRefresh;
        private Label _lblStatus;

        private readonly IAchievementTypeService _service;
        private List<AchievementType> _items = new List<AchievementType>();
        private string _selectedId;
        private bool _isNew;
        private string _pendingIconPath;   // local file path

        public AchievementTypeForm(IAchievementTypeService service)
        {
            _service = service;
            InitializeComponent();
            BuildUI();
        }

        // ── UI Construction ──────────────────────────────────────────────────

        private void BuildUI()
        {
            Text = "Achievement Types";
            // Size is ignored at runtime — DashboardForm forces Maximized on open.
            // StartPosition has no effect inside an MDI container.
            Font = new Font("Segoe UI", 9.5f);
            BackColor = Color.FromArgb(245, 247, 250);

            // ── Title ─────────────────────────────────────────────────────────
            _lblTitle = new Label
            {
                Text = "Achievement Types",
                Dock = DockStyle.Top,
                Height = 50,
                Font = new Font("Segoe UI", 15f, FontStyle.Bold),
                ForeColor = Color.FromArgb(17, 24, 39),
                BackColor = Color.White,
                TextAlign = ContentAlignment.MiddleLeft,
                Padding = new Padding(20, 0, 0, 0)
            };

            // ── Toolbar ───────────────────────────────────────────────────────
            var toolbar = new Panel
            {
                Dock = DockStyle.Top,
                Height = 50,
                BackColor = Color.White,
                Padding = new Padding(10, 8, 10, 8)
            };

            _btnNew = MakeToolbarButton("＋  New", Color.FromArgb(59, 130, 246));
            _btnSave = MakeToolbarButton("💾  Save", Color.FromArgb(16, 185, 129));
            _btnDelete = MakeToolbarButton("🗑  Delete", Color.FromArgb(239, 68, 68));
            _btnRefresh = MakeToolbarButton("⟳  Refresh", Color.FromArgb(107, 114, 128));

            _btnSave.Enabled = false;
            _btnDelete.Enabled = false;

            _btnNew.Click += BtnNew_Click;
            _btnSave.Click += BtnSave_Click;
            _btnDelete.Click += BtnDelete_Click;
            _btnRefresh.Click += async (s, e) => await LoadDataAsync();

            var btnFlow = new FlowLayoutPanel
            {
                Dock = DockStyle.Left,
                AutoSize = true,
                FlowDirection = FlowDirection.LeftToRight,
                WrapContents = false
            };
            btnFlow.Controls.AddRange(new Control[] { _btnNew, _btnSave, _btnDelete, _btnRefresh });
            toolbar.Controls.Add(btnFlow);

            // ── Status ────────────────────────────────────────────────────────
            _lblStatus = new Label
            {
                Dock = DockStyle.Bottom,
                Height = 26,
                ForeColor = Color.FromArgb(107, 114, 128),
                Font = new Font("Segoe UI", 9f),
                TextAlign = ContentAlignment.MiddleLeft,
                Padding = new Padding(10, 0, 0, 0),
                BackColor = Color.White
            };

            // ── Grid ──────────────────────────────────────────────────────────
            _grid = new DataGridView
            {
                Dock = DockStyle.Left,
                Width = 560,
                AllowUserToAddRows = false,
                AllowUserToDeleteRows = false,
                ReadOnly = true,
                SelectionMode = DataGridViewSelectionMode.FullRowSelect,
                AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill,
                BackgroundColor = Color.White,
                BorderStyle = BorderStyle.None,
                RowHeadersVisible = false,
                Font = new Font("Segoe UI", 9.5f)
            };
            _grid.SelectionChanged += Grid_SelectionChanged;
            _grid.Columns.Add(new DataGridViewTextBoxColumn { Name = "Id", HeaderText = "ID", FillWeight = 8 });
            _grid.Columns.Add(new DataGridViewTextBoxColumn { Name = "Code", HeaderText = "Code", FillWeight = 15 });
            _grid.Columns.Add(new DataGridViewTextBoxColumn { Name = "Name", HeaderText = "Name", FillWeight = 30 });
            _grid.Columns.Add(new DataGridViewTextBoxColumn { Name = "ReqType", HeaderText = "Req. Type", FillWeight = 22 });
            _grid.Columns.Add(new DataGridViewTextBoxColumn { Name = "ReqValue", HeaderText = "Req. Value", FillWeight = 12 });
            StyleGrid(_grid);

            // ── Detail panel ──────────────────────────────────────────────────
            _pnlDetail = new Panel
            {
                Dock = DockStyle.Fill,
                BackColor = Color.White,
                Padding = new Padding(20),
                AutoScroll = true
            };

            int left = 20, top = 20, fieldW = 230, labelH = 22, inputH = 28, gap = 10;

            // Code
            AddLabel(_pnlDetail, "Code *  (2–16 chars)", left, top, fieldW);
            top += labelH;
            _txtCode = AddTextBox(_pnlDetail, left, top, fieldW, maxLen: 16);
            top += inputH + gap;

            // Name
            AddLabel(_pnlDetail, "Name *", left, top, fieldW);
            top += labelH;
            _txtName = AddTextBox(_pnlDetail, left, top, fieldW);
            top += inputH + gap;

            // Description
            AddLabel(_pnlDetail, "Description", left, top, fieldW);
            top += labelH;
            _txtDescription = new TextBox
            {
                Location = new Point(left, top),
                Size = new Size(fieldW, 60),
                Font = new Font("Segoe UI", 9.5f),
                BorderStyle = BorderStyle.FixedSingle,
                Multiline = true
            };
            _pnlDetail.Controls.Add(_txtDescription);
            top += 60 + gap;

            // Requirement Type
            AddLabel(_pnlDetail, "Requirement Type", left, top, fieldW);
            top += labelH;
            _cmbRequirementType = new ComboBox
            {
                Location = new Point(left, top),
                Size = new Size(fieldW, inputH),
                Font = new Font("Segoe UI", 9.5f),
                DropDownStyle = ComboBoxStyle.DropDown
            };
            _cmbRequirementType.Items.AddRange(new object[] { "poll_count", "vote_count", "streak", "login_days", "other" });
            _pnlDetail.Controls.Add(_cmbRequirementType);
            top += inputH + gap;

            // Requirement Value
            AddLabel(_pnlDetail, "Requirement Value", left, top, fieldW);
            top += labelH;
            _nudRequirementValue = new NumericUpDown
            {
                Location = new Point(left, top),
                Size = new Size(fieldW, inputH),
                Font = new Font("Segoe UI", 9.5f),
                Minimum = 0,
                Maximum = 1000000,
                Increment = 1
            };
            _pnlDetail.Controls.Add(_nudRequirementValue);
            top += inputH + gap + 4;

            // Icon
            AddLabel(_pnlDetail, "Icon (image file)", left, top, fieldW);
            top += labelH;

            _picIcon = new PictureBox
            {
                Location = new Point(left, top),
                Size = new Size(72, 72),
                BorderStyle = BorderStyle.FixedSingle,
                SizeMode = PictureBoxSizeMode.Zoom,
                BackColor = Color.FromArgb(243, 244, 246)
            };

            _btnBrowseIcon = new Button
            {
                Text = "Browse…",
                Location = new Point(left + 80, top + 20),
                Size = new Size(90, 30),
                FlatStyle = FlatStyle.Flat,
                BackColor = Color.FromArgb(229, 231, 235),
                ForeColor = Color.FromArgb(55, 65, 81),
                Cursor = Cursors.Hand
            };
            _btnBrowseIcon.FlatAppearance.BorderSize = 0;
            _btnBrowseIcon.Click += BtnBrowseIcon_Click;

            _lblCurrentIcon = new Label
            {
                Location = new Point(left + 80, top + 54),
                Size = new Size(180, 18),
                Font = new Font("Segoe UI", 8f),
                ForeColor = Color.FromArgb(156, 163, 175)
            };

            _pnlDetail.Controls.Add(_picIcon);
            _pnlDetail.Controls.Add(_btnBrowseIcon);
            _pnlDetail.Controls.Add(_lblCurrentIcon);

            // ── Layout ────────────────────────────────────────────────────────
            Controls.Add(_pnlDetail);
            Controls.Add(_grid);
            Controls.Add(toolbar);
            Controls.Add(_lblTitle);
            Controls.Add(_lblStatus);

            Load += async (s, e) => await LoadDataAsync();
        }

        // ── Data Operations ──────────────────────────────────────────────────

        private async Task LoadDataAsync()
        {
            SetStatus("Loading…");
            try
            {
                _items = await _service.GetAllAsync();
                PopulateGrid();
                SetStatus($"{_items.Count} record(s) loaded.");
            }
            catch (Exception ex)
            {
                SetStatus($"Error: {ex.Message}", error: true);
            }
        }

        private void PopulateGrid()
        {
            _grid.Rows.Clear();
            foreach (var item in _items)
            {
                _grid.Rows.Add(item.Id, item.Code, item.Name, item.RequirementType, item.RequirementValue);
                _grid.Rows[_grid.Rows.Count - 1].Tag = item;
            }
        }

        private void Grid_SelectionChanged(object sender, EventArgs e)
        {
            if (_grid.SelectedRows.Count == 0) return;

            var item = _grid.SelectedRows[0].Tag as AchievementType;
            if (item == null) return;

            _isNew = false;
            _selectedId = item.Id;
            _pendingIconPath = null;

            _txtCode.Text = item.Code;
            _txtName.Text = item.Name;
            _txtDescription.Text = item.Description;
            _cmbRequirementType.Text = item.RequirementType;
            _nudRequirementValue.Value = item.RequirementValue;

            // Display existing icon URL as a label
            _lblCurrentIcon.Text = string.IsNullOrEmpty(item.IconUrl) ? "(no icon)" : "Current: (server)";
            _picIcon.Image = null;

            _btnSave.Enabled = true;
            _btnDelete.Enabled = true;
        }

        private void BtnNew_Click(object sender, EventArgs e)
        {
            _isNew = true;
            _selectedId = null;
            _pendingIconPath = null;

            _txtCode.Clear();
            _txtName.Clear();
            _txtDescription.Clear();
            _cmbRequirementType.SelectedIndex = -1;
            _nudRequirementValue.Value = 0;
            _picIcon.Image = null;
            _lblCurrentIcon.Text = string.Empty;

            _grid.ClearSelection();
            _txtCode.Focus();

            _btnSave.Enabled = true;
            _btnDelete.Enabled = false;
        }

        private async void BtnSave_Click(object sender, EventArgs e)
        {
            SetBusy(true);
            try
            {
                if (_isNew)
                {
                    var dto = new CreateAchievementTypeDto
                    {
                        Code = _txtCode.Text.Trim(),
                        Name = _txtName.Text.Trim(),
                        Description = _txtDescription.Text.Trim(),
                        RequirementType = _cmbRequirementType.Text.Trim(),
                        RequirementValue = (int)_nudRequirementValue.Value,
                        IconFilePath = _pendingIconPath
                    };
                    await _service.CreateAsync(dto);
                    SetStatus("Created successfully.");
                }
                else
                {
                    var dto = new UpdateAchievementTypeDto
                    {
                        Code = _txtCode.Text.Trim(),
                        Name = _txtName.Text.Trim(),
                        Description = _txtDescription.Text.Trim(),
                        RequirementType = _cmbRequirementType.Text.Trim(),
                        RequirementValue = (int)_nudRequirementValue.Value,
                        IconFilePath = _pendingIconPath
                    };
                    await _service.UpdateAsync(_selectedId, dto);
                    SetStatus("Updated successfully.");
                }

                await LoadDataAsync();
            }
            catch (Exception ex)
            {
                SetStatus($"Error: {ex.Message}", error: true);
            }
            finally
            {
                SetBusy(false);
            }
        }

        private async void BtnDelete_Click(object sender, EventArgs e)
        {
            if (_selectedId == null) return;

            if (MessageBox.Show("Delete this achievement type?", "Confirm",
                    MessageBoxButtons.YesNo, MessageBoxIcon.Warning) != DialogResult.Yes) return;

            SetBusy(true);
            try
            {
                await _service.DeleteAsync(_selectedId);
                SetStatus("Deleted successfully.");
                BtnNew_Click(sender, e);
                await LoadDataAsync();
            }
            catch (Exception ex)
            {
                SetStatus($"Error: {ex.Message}", error: true);
            }
            finally
            {
                SetBusy(false);
            }
        }

        private void BtnBrowseIcon_Click(object sender, EventArgs e)
        {
            using (var dlg = new OpenFileDialog())
            {
                dlg.Title = "Select Icon Image";
                dlg.Filter = "Image Files|*.jpg;*.jpeg;*.png;*.gif;*.webp";

                if (dlg.ShowDialog() != DialogResult.OK) return;

                _pendingIconPath = dlg.FileName;
                _lblCurrentIcon.Text = Path.GetFileName(dlg.FileName);

                try
                {
                    _picIcon.Image = Image.FromFile(dlg.FileName);
                }
                catch
                {
                    _picIcon.Image = null;
                }
            }
        }

        // ── Utilities ────────────────────────────────────────────────────────

        private void SetStatus(string text, bool error = false)
        {
            _lblStatus.Text = text;
            _lblStatus.ForeColor = error
                ? Color.FromArgb(220, 38, 38)
                : Color.FromArgb(107, 114, 128);
        }

        private void SetBusy(bool busy)
        {
            _btnSave.Enabled = !busy;
            _btnDelete.Enabled = !busy && !_isNew;
            _btnNew.Enabled = !busy;
            _btnRefresh.Enabled = !busy;
            Cursor = busy ? Cursors.WaitCursor : Cursors.Default;
        }

        private static Label AddLabel(Panel parent, string text, int x, int y, int w)
        {
            var lbl = new Label
            {
                Text = text,
                Location = new Point(x, y),
                Size = new Size(w, 22),
                ForeColor = Color.FromArgb(55, 65, 81)
            };
            parent.Controls.Add(lbl);
            return lbl;
        }

        private static TextBox AddTextBox(Panel parent, int x, int y, int w, int maxLen = 200)
        {
            var txt = new TextBox
            {
                Location = new Point(x, y),
                Size = new Size(w, 28),
                Font = new Font("Segoe UI", 9.5f),
                BorderStyle = BorderStyle.FixedSingle,
                MaxLength = maxLen
            };
            parent.Controls.Add(txt);
            return txt;
        }

        private static Button MakeToolbarButton(string text, Color color)
        {
            var btn = new Button
            {
                Text = text,
                Size = new Size(120, 34),
                FlatStyle = FlatStyle.Flat,
                BackColor = color,
                ForeColor = Color.White,
                Font = new Font("Segoe UI", 9f, FontStyle.Bold),
                Cursor = Cursors.Hand,
                Margin = new Padding(0, 0, 6, 0)
            };
            btn.FlatAppearance.BorderSize = 0;
            return btn;
        }

        private static void StyleGrid(DataGridView grid)
        {
            grid.ColumnHeadersDefaultCellStyle = new DataGridViewCellStyle
            {
                BackColor = Color.FromArgb(243, 244, 246),
                ForeColor = Color.FromArgb(55, 65, 81),
                Font = new Font("Segoe UI", 9.5f, FontStyle.Bold),
                Padding = new Padding(4)
            };
            grid.DefaultCellStyle = new DataGridViewCellStyle
            {
                BackColor = Color.White,
                ForeColor = Color.FromArgb(17, 24, 39),
                SelectionBackColor = Color.FromArgb(219, 234, 254),
                SelectionForeColor = Color.FromArgb(17, 24, 39)
            };
            grid.AlternatingRowsDefaultCellStyle = new DataGridViewCellStyle
            {
                BackColor = Color.FromArgb(249, 250, 251),
                SelectionBackColor = Color.FromArgb(219, 234, 254),
                SelectionForeColor = Color.FromArgb(17, 24, 39)
            };
            grid.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            grid.ColumnHeadersHeight = 36;
            grid.RowTemplate.Height = 32;
            grid.EnableHeadersVisualStyles = false;
        }
        private void AchievementTypeForm_Load(object sender, EventArgs e)
        {

        }
    }
}
