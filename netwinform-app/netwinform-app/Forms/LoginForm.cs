using System;
using System.Drawing;
using System.Windows.Forms;
using netwinform_app.Services;
using netwinform_app;
using netwinform_app.Services.Auth;

namespace netwinform_app.Forms
{
    public partial class LoginForm : Form
    {
        // ── Controls ─────────────────────────────────────────────────────────
       
       
        private PictureBox _picSpinner;

        private readonly IAuthService _authService;

        public LoginForm(IAuthService authService)
        {
            _authService = authService;
            InitializeComponent();
        }

        private async void BtnLogin_Click(object sender, EventArgs e)
        {
            SetBusy(true);
            _lblStatus.Visible = false;

            try
            {
                await _authService.LoginAsync(_txtEmail.Text.Trim(), _txtPassword.Text);

                var dashboard = Program.ServiceProvider.GetService(typeof(DashboardForm)) as DashboardForm;
                dashboard.Show();
                Hide();
            }
            catch (Exception ex)
            {
                _lblStatus.Text = ex.Message;
                _lblStatus.Visible = true;
            }
            finally
            {
                SetBusy(false);
            }
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {
            _pnlCard.Controls.AddRange(new Control[]
           {
                 _lblEmail, _txtEmail,
                _lblPassword, _txtPassword, _btnLogin, _lblStatus
           });
            _lblStatus.Parent = _pnlCard;
            _lblStatus.Dock = DockStyle.Fill;
            this._pnlErr.SendToBack();
            this._lblStatus.SendToBack();

            Controls.Add(_pnlCard);
        }

        private void SetBusy(bool busy)
        {
            _btnLogin.Enabled = !busy;
            _btnLogin.Text = busy ? "Memproses.." : "Log In";
            _txtEmail.Enabled = !busy;
            _txtPassword.Enabled = !busy;
            Cursor = busy ? Cursors.WaitCursor : Cursors.Default;
        }
        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            if (keyData == Keys.Enter)
            {
                if (_txtEmail.Focused)
                {
                    _txtPassword.Focus();
                    return true;
                }

                if (_txtPassword.Focused)
                {
                    _btnLogin.Focus();
                    return true;
                }
            }

            if (keyData == Keys.Up)
            {
                SelectNextControl(ActiveControl, false, true, true, true);
                return true;
            }

            if (keyData == Keys.Down)
            {
                SelectNextControl(ActiveControl, true, true, true, true);
                return true;
            }

            return base.ProcessCmdKey(ref msg, keyData);
        }
    }
}