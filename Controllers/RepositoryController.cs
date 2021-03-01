namespace List_of_Repositories.Controllers
{
    public class RepositoryController :Controllers
    {
        public IActionResult Details(int id){
            return ControllerContext.MyDisplayRouteInfo(id);
        }
    }
}