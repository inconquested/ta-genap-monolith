using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MaterialSkin;

namespace netwinform_app.Helpers
{
    public sealed class AppThemeManager
    {
        private static readonly Lazy<AppThemeManager> _instance = new Lazy<AppThemeManager>(() => new AppThemeManager());

        public static AppThemeManager Instance => _instance.Value;

        private readonly MaterialSkinManager _materialManager;
        private AppThemeManager()
        {
            _materialManager = MaterialSkinManager.Instance;
        }
        public void ApplyLightTheme() { 
            _materialManager.Theme = MaterialSkinManager.Themes.LIGHT;

            _materialManager.ColorScheme = new ColorScheme(
                Primary.BlueGrey800,
                Primary.BlueGrey900,
                Primary.BlueGrey500,
                Accent.LightBlue200,
                TextShade.WHITE);
        } 
        public void applyDarkTheme() { 
        }
    }
}

