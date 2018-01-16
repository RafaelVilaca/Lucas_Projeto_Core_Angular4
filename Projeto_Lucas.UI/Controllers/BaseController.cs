using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;
using System.Net;

namespace Hades.Web.Controllers
{
    public class BaseController : Controller
    {
        protected IActionResult ViewResponse(HttpStatusCode status, string value = "")
        {
            Response.StatusCode = (int)status;
            return Content(value);
        }

        protected IActionResult ViewResponse(HttpStatusCode status, IEnumerable<string> value, string separador = "<br/>")
        {
            Response.StatusCode = (int)status;
            return Content(string.Join(separador, value));
        }

        public IActionResult ErrorMessage(string message)
        {
            return ViewResponse(HttpStatusCode.BadRequest, message);
        }

        public IActionResult ErrorMessage(IEnumerable<string> value)
        {
            return ViewResponse(HttpStatusCode.BadRequest, value);
        }

        //protected override void OnException(ExceptionContext filterContext)
        //{
        //    filterContext.ExceptionHandled = true;
        //    filterContext.Result =  ErrorMessage($"Erro durante a operação: {filterContext.Exception.Message}");
        //}
    }
}