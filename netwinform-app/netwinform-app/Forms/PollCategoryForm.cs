using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using netwinform_app.DTOs;
using netwinform_app.Models;
using netwinform_app.Services.PollCategory;

namespace netwinform_app.Forms
{
    public partial class PollCategoryForm : Form
    {
        // ── Controls ─────────────────────────────────────────────────────────
        private Label _lblTitle;
        private DataGridView _grid;
        private Panel _pnlDetail;
        private Label _lblLabelField;
        private TextBox _txtLabel;
        private Button _btnNew;
        private Button _btnSave;
        private Button _btnDelete;
        private Button _btnRefresh;
        private Label _lblStatus;

        private readonly IPollCategoryService _service;
        private List<PollCategory> _items = new List<PollCategory>();
        private string _selectedId;          // 0 = new record
        private bool _isNew;

        public PollCategoryForm(IPollCategoryService service)
        {
            _service = service;
            InitializeComponent();
            BuildUI();
        }

        // ── UI Construction ──────────────────────────────────────────────────

        private void BuildUI()
        {
            Text = "Poll Categories";
            // Size is ignored at runtime — DashboardForm forces Maximized on open.
            // StartPosition has no effect inside an MDI container.
            Font = new Font("Segoe UI", 9.5f);
            BackColor = Color.FromArgb(245, 247, 250);

            // ── Title bar ─────────────────────────────────────────────────────
            _lblTitle = new Label
            {
                Text = "Poll Categories",
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

            // ── Status label ──────────────────────────────────────────────────
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

            _grid.Columns.Add(new DataGridViewTextBoxColumn { Name = "Id", HeaderText = "ID", Width = 60, FillWeight = 10 });
            _grid.Columns.Add(new DataGridViewTextBoxColumn { Name = "Label", HeaderText = "Label", FillWeight = 60 });
            _grid.Columns.Add(new DataGridViewTextBoxColumn { Name = "CreatedAt", HeaderText = "Created At", FillWeight = 30 });

            StyleGrid(_grid);

            // ── Detail panel ──────────────────────────────────────────────────
            _pnlDetail = new Panel
            {
                Dock = DockStyle.Fill,
                BackColor = Color.White,
                Padding = new Padding(20)
            };

            _lblLabelField = new Label
            {
                Text = "Label *",
                Location = new Point(20, 20),
                Size = new Size(240, 22),
                ForeColor = Color.FromArgb(55, 65, 81)
            };

            _txtLabel = new TextBox
            {
                Location = new Point(20, 44),
                Size = new Size(240, 30),
                Font = new Font("Segoe UI", 10f),
                BorderStyle = BorderStyle.FixedSingle,
                MaxLength = 255
            };

            _pnlDetail.Controls.AddRange(new Control[] { _lblLabelField, _txtLabel });

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
                _grid.Rows.Add(item.Id, item.Label, item.CreatedAt);
                _grid.Rows[_grid.Rows.Count - 1].Tag = item;
            }
        }

        private void Grid_SelectionChanged(object sender, EventArgs e)
        {
            if (_grid.SelectedRows.Count == 0) return;

            var row = _grid.SelectedRows[0];
            var item = row.Tag as PollCategory;
            if (item == null) return;

            _isNew = false;
            _selectedId = item.Id;
            _txtLabel.Text = item.Label;

            _btnSave.Enabled = true;
            _btnDelete.Enabled = true;
        }

        private void BtnNew_Click(object sender, EventArgs e)
        {
            _isNew = true;
            _selectedId = null;
            _txtLabel.Clear();
            _txtLabel.Focus();
            _grid.ClearSelection();

            _btnSave.Enabled = true;
            _btnDelete.Enabled = false;
        }

        private async void BtnSave_Click(object sender, EventArgs e)
        {
            var label = _txtLabel.Text.Trim();
            if (string.IsNullOrEmpty(label))
            {
                MessageBox.Show("Label is required.", "Validation", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            SetBusy(true);
            try
            {
                if (_isNew)
                {
                    await _service.CreateAsync(new CreatePollCategoryDto { Label = label });
                    SetStatus("Created successfully.");
                }
                else
                {
                    await _service.UpdateAsync(_selectedId, new UpdatePollCategoryDto { Label = label });
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

            if (MessageBox.Show("Delete this category?", "Confirm",
                    MessageBoxButtons.YesNo, MessageBoxIcon.Warning) != DialogResult.Yes) return;

            SetBusy(true);
            try
            {
                await _service.DeleteAsync(_selectedId);
                SetStatus("Deleted successfully.");
                _txtLabel.Clear();
                _btnSave.Enabled = false;
                _btnDelete.Enabled = false;
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

        private static Button MakeToolbarButton(string text, Color color)
        {
            var btn = new Button
            {
                Text = text,
                Size = new Size(110, 34),
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
        private void PollCategoryForm_Load(object sender, EventArgs e)
        {

        }
    }
}
