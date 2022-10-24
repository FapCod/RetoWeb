using RetoWeb.Datos;
using RetoWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ServiceModel;
using System.Collections;
using RetoWeb.ServiceReference1;

namespace RetoWeb.Controllers
{
    public class TareaController : Controller
    {
        
        TareaAdmin admin = new TareaAdmin();
        //necesario para consumir el servicio


        // GET: Tarea
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ListarTareas()
        {
            try
            {
                Service1Client client = new ConexionConWCF().ConexionWCF();
                var lista = client.ObtenerTareas();
                return Json(lista, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            
        }

        public int CrearTarea(TAREA tarea)
        {
            int nregistrosAfectados = 0;
            try
            {
                //admin.Guardar(tarea);
                Service1Client client = new ConexionConWCF().ConexionWCF();
                client.InsertarTarea(tarea);
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
                Console.WriteLine(ex.Message);
            }
            return nregistrosAfectados;
        }
        public int EditarTarea(TAREA tarea)
        {
            int nregistrosAfectados = 0;
            try
            {
                //admin.Editar(tarea);
                Service1Client client = new ConexionConWCF().ConexionWCF();
                client.EditarTarea(tarea);
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
                Console.WriteLine(ex.Message);
            }
            return nregistrosAfectados;
        }
        public int EliminarTarea(Tarea tarea)
        {
            int nregistrosAfectados = 0;
            int id = tarea.ID;
            try
            {
                //admin.Eliminar(tarea);
                Service1Client client = new ConexionConWCF().ConexionWCF();
                client.EliminarTarea(id);
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
                Console.WriteLine(ex.Message);
            }
            return nregistrosAfectados;

        }
        public JsonResult BuscarPorId(int id)
        {
            IEnumerable<Tarea> lista = admin.BuscarPorID(id);
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BuscarPorPrioridad(int prioridad)
        {
            IEnumerable<Tarea> lista = admin.BuscarPrioridad(prioridad);
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

    }
}