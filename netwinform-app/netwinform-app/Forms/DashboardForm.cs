using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using netwinform_app.Services.Auth;

namespace netwinform_app.Forms
{
    public partial class DashboardForm : Form
    {
        // ── Controls ─────────────────────────────────────────────────────────
        private Label _lblAppName;
        private Button _btnPollCategories;
        private Button _btnAchievementTypes;
        private Button _btnLogout;

        // Tracks which sidebar button is currently active
        private Button _activeNavButton;

        private readonly IAuthService _authService;

        // ── Color constants ───────────────────────────────────────────────────
        private static readonly Color SidebarBg = Color.FromArgb(17, 24, 39);
        private static readonly Color SidebarHdrBg = Color.FromArgb(11, 16, 28);
        private static readonly Color NavDefault = Color.FromArgb(17, 24, 39);
        private static readonly Color NavActive = Color.FromArgb(37, 99, 235);   // blue-600
        private static readonly Color NavHover = Color.FromArgb(31, 41, 55);
        private static readonly Color NavTextDefault = Color.FromArgb(209, 213, 219);
        private static readonly Color NavTextActive = Color.White;
        private static readonly Color MdiBg = Color.FromArgb(243, 244, 246);

        public DashboardForm(IAuthService authService)
        {
            _authService = authService;
            InitializeComponent();
            StyleMdiClient();
            BuildUI();
        }

        private void BuildUI()
        {
            _lblAppName = new Label
            {
                Text = "Admin Panel",
                Dock = DockStyle.Top,
                Height = 60,
                ForeColor = Color.White,
                Font = new Font("Segoe UI", 12f, FontStyle.Bold),
                TextAlign = ContentAlignment.MiddleCenter,
                BackColor = SidebarHdrBg
            };

            _btnPollCategories = MakeSidebarButton("🗂  Poll Categories");
            _btnAchievementTypes = MakeSidebarButton("🏆  Achievement Types");

            _btnPollCategories.Click += (s, e) => OpenMdiChild<PollCategoryForm>(_btnPollCategories);
            _btnAchievementTypes.Click += (s, e) => OpenMdiChild<AchievementTypeForm>(_btnAchievementTypes);

            // ── Logout — pinned to bottom ─────────────────────────────────────
            _btnLogout = new Button
            {
                Text = "⏻  Logout",
                Dock = DockStyle.Bottom,
                Height = 46,
                FlatStyle = FlatStyle.Flat,
                ForeColor = Color.FromArgb(252, 165, 165),
                BackColor = SidebarBg,
                Font = new Font("Segoe UI", 10f),
                Cursor = Cursors.Hand,
                TextAlign = ContentAlignment.MiddleLeft,
                Padding = new Padding(20, 0, 0, 0)
            };
            _btnLogout.FlatAppearance.BorderSize = 0;
            _btnLogout.Click += BtnLogout_Click;

            // Add in reverse dock order so Top-docked items stack top-down
            _pnlSidebar.Controls.Add(_btnAchievementTypes);
            _pnlSidebar.Controls.Add(_btnPollCategories);
            _pnlSidebar.Controls.Add(_lblAppName);
            _pnlSidebar.Controls.Add(_btnLogout);

            Controls.Add(_pnlSidebar);
        }

        /// <summary>
        /// Reaches into the auto-created MdiClient control and applies our
        /// background color. Must be called after InitializeComponent.
        /// </summary>
        private void StyleMdiClient()
        {
            foreach (Control ctrl in Controls)
            {
                if (ctrl is MdiClient mdiClient)
                {
                  
                    break;
                }
            }
        }

        // ── MDI Navigation ───────────────────────────────────────────────────

        /// <summary>
        /// Opens a child form of type <typeparamref name="TForm"/> inside the
        /// MDI area. If one is already open, brings it to front instead of
        /// creating a duplicate.
        /// </summary>
        private void OpenMdiChild<TForm>(Button sourceButton) where TForm : Form
        {
            // ── Duplicate guard ───────────────────────────────────────────────
            foreach (Form child in MdiChildren)
            {
                if (child is TForm)
                {
                    child.WindowState = FormWindowState.Maximized;
                    child.Activate();
                    SetActiveNavButton(sourceButton);
                    return;
                }
            }

            // ── Resolve from DI ───────────────────────────────────────────────
            if (!(Program.ServiceProvider.GetService(typeof(TForm)) is Form form)) return;

            form.MdiParent = this;
            form.WindowState = FormWindowState.Maximized;
            form.FormClosed += (s, e) => ClearActiveNavButton(sourceButton);
            form.Show();

            SetActiveNavButton(sourceButton);
        }

        // ── Active nav highlight ─────────────────────────────────────────────

        private void SetActiveNavButton(Button btn)
        {
            // Reset previous active button
            if (_activeNavButton != null)
            {
                _activeNavButton.BackColor = NavDefault;
                _activeNavButton.ForeColor = NavTextDefault;
                _activeNavButton.FlatAppearance.BorderSize = 0;
            }

            // Highlight new active button
            btn.BackColor = NavActive;
            btn.ForeColor = NavTextActive;
            btn.FlatAppearance.BorderSize = 0;
            btn.FlatAppearance.MouseOverBackColor = NavActive;

            _activeNavButton = btn;
        }

        private void ClearActiveNavButton(Button btn)
        {
            // Only clear if it's still the active one
            if (_activeNavButton != btn) return;

            btn.BackColor = NavDefault;
            btn.ForeColor = NavTextDefault;
            btn.FlatAppearance.MouseOverBackColor = NavHover;
            _activeNavButton = null;
        }

        // ── Logout ───────────────────────────────────────────────────────────

        private async void BtnLogout_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Anda yakin ingin logout?",
                    "Konfirmasi", MessageBoxButtons.YesNo,
                    MessageBoxIcon.Question) != DialogResult.Yes) return;

            // Close all MDI children cleanly before logging out
            foreach (Form child in MdiChildren)
                child.Close();

             await _authService.LogoutAsync();

            var login = Program.ServiceProvider.GetService(typeof(LoginForm)) as LoginForm;
            login?.Show();
            Close();
        }

        // ── Helpers ──────────────────────────────────────────────────────────

        private static Button MakeSidebarButton(string text)
        {
            var btn = new Button
            {
                Text = text,
                Dock = DockStyle.Top,
                Height = 46,
                FlatStyle = FlatStyle.Flat,
                ForeColor = NavTextDefault,
                BackColor = NavDefault,
                Font = new Font("Segoe UI", 10f),
                Cursor = Cursors.Hand,
                TextAlign = ContentAlignment.MiddleLeft,
                Padding = new Padding(20, 0, 0, 0)
            };
            btn.FlatAppearance.BorderSize = 0;
            btn.FlatAppearance.MouseOverBackColor = NavHover;
            return btn;
        }
        private void DashboardForm_Load(object sender, EventArgs e)
        {
            this.IsMdiContainer = true;
        }
    }
}
