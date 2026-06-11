using Microsoft.AspNetCore.Mvc;

namespace Hub317.Controllers;

/// <summary>
/// Status / health endpoint.
/// GET /api/status  →  { hub, status, version, timestamp }
///
/// This is the template for future controllers (GitHub, Media, Recipes, etc.)
/// Each app section will get its own controller as you build them out.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class StatusController : ControllerBase
{
    private readonly IConfiguration _config;

    public StatusController(IConfiguration config)
    {
        _config = config;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            hub       = _config["Hub317:Name"] ?? "Hub 317",
            version   = _config["Hub317:Version"] ?? "0.1.0",
            status    = "online",
            timestamp = DateTime.UtcNow.ToString("O"),
            endpoints = new[]
            {
                "GET /api/status",
                // Future: GET /api/github/repos
                // Future: GET /api/media/now-playing
                // Future: GET /api/recipes
            }
        });
    }
}
