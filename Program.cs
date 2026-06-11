// Hub 317 — ASP.NET Core entry point
// Run with: dotnet run
// Access at: http://localhost:317

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

// Serve everything in wwwroot (index.html, css, js, etc.)
app.UseDefaultFiles();   // maps "/" → "/index.html"
app.UseStaticFiles();

// C# API controllers (add more in /Controllers/)
app.MapControllers();

// SPA fallback — any unknown route returns index.html
// (lets the JS router handle deep links)
app.MapFallbackToFile("index.html");

app.Run();
