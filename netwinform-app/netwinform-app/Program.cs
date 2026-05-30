using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using netwinform_app.Forms;
using netwinform_app.Repositories.Implementation;
using netwinform_app.Repositories.Interfaces;
using netwinform_app.Services.AchievementType;
using netwinform_app.Services.Auth;
using netwinform_app.Services.PollCategory;

namespace netwinform_app
{
    internal static class Program
    {
        public static IServiceProvider ServiceProvider { get; private set; }
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;

            var services = new ServiceCollection();
            ConfigureServices(services);
            ServiceProvider = services.BuildServiceProvider();

            Application.Run(ServiceProvider.GetService<Form1>());
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(builder =>
            {
                builder.AddConsole();
                builder.AddDebug();
                builder.SetMinimumLevel(LogLevel.Debug);
            }
            );

            // ── HttpClient (singleton — one instance per app) ────────────────
            services.AddSingleton<HttpClient>(provider =>
            {
                var baseUrl = "http://127.0.0.1:8000/api/";
                var client = new HttpClient
                {
                    BaseAddress = new Uri(baseUrl)
                };
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                return client;
            });

            // ── Repositories ─────────────────────────────────────────────────
            services.AddTransient<IAuthRepository, AuthRepository>();
            services.AddTransient<IPollCategoryRepository, PollCategoryRepository>();
            services.AddTransient<IAchievementTypeRepository, AchievementTypeRepository>();

            // ── Services ─────────────────────────────────────────────────────
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IPollCategoryService, PollCategoryService>();
            services.AddTransient<IAchievementTypeService, AchievementTypeService>();

            // ── Forms ────────────────────────────────────────────────────────
            services.AddTransient<LoginForm>();
            services.AddTransient<PollCategoryForm>();
            services.AddTransient<AchievementTypeForm>();
            services.AddTransient<DashboardForm>();
            services.AddTransient<Form1>();
        }
    }
}
