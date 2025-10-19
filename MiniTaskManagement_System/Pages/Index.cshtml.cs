using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MiniTaskManagement_System.Models;

namespace MiniTaskManagement_System.Pages
{
    public class IndexModel : PageModel
    {
        public List<TaskModel> Tasks { get; set; } = new();


        public void OnGet()
        {
            Tasks = new List<TaskModel>
            {
                new TaskModel { Id = 1, Title = "Setup UI", Description = "Create Razor Pages", Status = "Done", DueDate = DateTime.Now.AddDays(0) },
                new TaskModel { Id = 2, Title = "Build API", Description = "Develop REST API backend", Status = "In Progress", DueDate = DateTime.Now.AddDays(0) },
                new TaskModel { Id = 3, Title = "Connect API", Description = "Integrate UI and API", Status = "To Do", DueDate = DateTime.Now.AddDays(0) }
            };
        }
    }
}
