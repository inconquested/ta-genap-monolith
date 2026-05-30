namespace netwinform_app.Forms
{
    partial class LoginForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this._pnlCard = new System.Windows.Forms.Panel();
            this._pnlErr = new System.Windows.Forms.Panel();
            this._lblStatus = new System.Windows.Forms.Label();
            this._btnLogin = new System.Windows.Forms.Button();
            this._lblPassword = new System.Windows.Forms.Label();
            this._lblEmail = new System.Windows.Forms.Label();
            this._txtPassword = new System.Windows.Forms.TextBox();
            this._txtEmail = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.materialDrawer1 = new MaterialSkin.Controls.MaterialDrawer();
            this._pnlCard.SuspendLayout();
            this._pnlErr.SuspendLayout();
            this.SuspendLayout();
            // 
            // _pnlCard
            // 
            this._pnlCard.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this._pnlCard.Controls.Add(this._pnlErr);
            this._pnlCard.Controls.Add(this._btnLogin);
            this._pnlCard.Controls.Add(this._txtEmail);
            this._pnlCard.Controls.Add(this._lblPassword);
            this._pnlCard.Controls.Add(this._lblEmail);
            this._pnlCard.Controls.Add(this._txtPassword);
            this._pnlCard.Location = new System.Drawing.Point(156, 84);
            this._pnlCard.Name = "_pnlCard";
            this._pnlCard.Size = new System.Drawing.Size(482, 333);
            this._pnlCard.TabIndex = 0;
            // 
            // _pnlErr
            // 
            this._pnlErr.Controls.Add(this._lblStatus);
            this._pnlErr.Dock = System.Windows.Forms.DockStyle.Bottom;
            this._pnlErr.Location = new System.Drawing.Point(0, 297);
            this._pnlErr.MaximumSize = new System.Drawing.Size(480, 34);
            this._pnlErr.Name = "_pnlErr";
            this._pnlErr.Size = new System.Drawing.Size(480, 34);
            this._pnlErr.TabIndex = 5;
            // 
            // _lblStatus
            // 
            this._lblStatus.Dock = System.Windows.Forms.DockStyle.Bottom;
            this._lblStatus.Font = new System.Drawing.Font("JetBrains Mono", 9F);
            this._lblStatus.ForeColor = System.Drawing.Color.White;
            this._lblStatus.Location = new System.Drawing.Point(0, 11);
            this._lblStatus.Name = "_lblStatus";
            this._lblStatus.Size = new System.Drawing.Size(480, 23);
            this._lblStatus.TabIndex = 4;
            this._lblStatus.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // _btnLogin
            // 
            this._btnLogin.Location = new System.Drawing.Point(36, 227);
            this._btnLogin.Name = "_btnLogin";
            this._btnLogin.Size = new System.Drawing.Size(412, 52);
            this._btnLogin.TabIndex = 3;
            this._btnLogin.Text = "button1";
            this._btnLogin.UseVisualStyleBackColor = true;
            this._btnLogin.Click += new System.EventHandler(this.BtnLogin_Click);
            // 
            // _lblPassword
            // 
            this._lblPassword.AutoSize = true;
            this._lblPassword.Font = new System.Drawing.Font("JetBrains Mono", 11F);
            this._lblPassword.ForeColor = System.Drawing.Color.White;
            this._lblPassword.Location = new System.Drawing.Point(39, 130);
            this._lblPassword.Name = "_lblPassword";
            this._lblPassword.Size = new System.Drawing.Size(117, 29);
            this._lblPassword.TabIndex = 2;
            this._lblPassword.Text = "Password";
            // 
            // _lblEmail
            // 
            this._lblEmail.AutoSize = true;
            this._lblEmail.Font = new System.Drawing.Font("JetBrains Mono", 11F);
            this._lblEmail.ForeColor = System.Drawing.Color.White;
            this._lblEmail.Location = new System.Drawing.Point(39, 27);
            this._lblEmail.Name = "_lblEmail";
            this._lblEmail.Size = new System.Drawing.Size(78, 29);
            this._lblEmail.TabIndex = 1;
            this._lblEmail.Text = "Email";
            // 
            // _txtPassword
            // 
            this._txtPassword.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(12)))), ((int)(((byte)(12)))), ((int)(((byte)(12)))));
            this._txtPassword.Font = new System.Drawing.Font("JetBrains Mono", 12F);
            this._txtPassword.ForeColor = System.Drawing.Color.White;
            this._txtPassword.Location = new System.Drawing.Point(36, 162);
            this._txtPassword.MaxLength = 100;
            this._txtPassword.Name = "_txtPassword";
            this._txtPassword.Size = new System.Drawing.Size(412, 39);
            this._txtPassword.TabIndex = 1;
            this._txtPassword.Text = "Email";
            // 
            // _txtEmail
            // 
            this._txtEmail.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(12)))), ((int)(((byte)(12)))), ((int)(((byte)(12)))));
            this._txtEmail.Font = new System.Drawing.Font("JetBrains Mono", 12F);
            this._txtEmail.ForeColor = System.Drawing.Color.White;
            this._txtEmail.Location = new System.Drawing.Point(36, 59);
            this._txtEmail.MaxLength = 100;
            this._txtEmail.Name = "_txtEmail";
            this._txtEmail.Size = new System.Drawing.Size(412, 39);
            this._txtEmail.TabIndex = 0;
            this._txtEmail.Text = "Email";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("JetBrains Mono", 16F);
            this.label1.ForeColor = System.Drawing.Color.White;
            this.label1.Location = new System.Drawing.Point(242, 27);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(323, 43);
            this.label1.TabIndex = 0;
            this.label1.Text = "Electa Dashboard";
            // 
            // materialDrawer1
            // 
            this.materialDrawer1.AutoHide = false;
            this.materialDrawer1.AutoShow = false;
            this.materialDrawer1.BackgroundWithAccent = false;
            this.materialDrawer1.BaseTabControl = null;
            this.materialDrawer1.Depth = 0;
            this.materialDrawer1.HighlightWithAccent = true;
            this.materialDrawer1.IndicatorWidth = 0;
            this.materialDrawer1.IsOpen = false;
            this.materialDrawer1.Location = new System.Drawing.Point(3, 0);
            this.materialDrawer1.MouseState = MaterialSkin.MouseState.HOVER;
            this.materialDrawer1.Name = "materialDrawer1";
            this.materialDrawer1.ShowIconsWhenHidden = false;
            this.materialDrawer1.Size = new System.Drawing.Size(105, 452);
            this.materialDrawer1.TabIndex = 1;
            this.materialDrawer1.Text = "materialDrawer1";
            this.materialDrawer1.UseColors = false;
            // 
            // LoginForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(12)))), ((int)(((byte)(12)))), ((int)(((byte)(12)))));
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.materialDrawer1);
            this.Controls.Add(this.label1);
            this.Controls.Add(this._pnlCard);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "LoginForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "LoginForm";
            this.Load += new System.EventHandler(this.LoginForm_Load);
            this._pnlCard.ResumeLayout(false);
            this._pnlCard.PerformLayout();
            this._pnlErr.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel _pnlCard;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox _txtEmail;
        private System.Windows.Forms.TextBox _txtPassword;
        private System.Windows.Forms.Label _lblEmail;
        private System.Windows.Forms.Label _lblPassword;
        private System.Windows.Forms.Button _btnLogin;
        private System.Windows.Forms.Label _lblStatus;
        private System.Windows.Forms.Panel _pnlErr;
        private MaterialSkin.Controls.MaterialDrawer materialDrawer1;
    }
}