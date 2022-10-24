using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace ProyectoWCF
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Service1" en el código, en svc y en el archivo de configuración.
    // NOTE: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Service1.svc o Service1.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Service1 : IService1
    {
        public void EditarTarea(TAREA tarea)
        {
            try {
                ContextoDatosDataContext contexto = new ContextoDatosDataContext();
                TAREA tareaEditar = contexto.TAREA.Where(t => t.ID == tarea.ID).FirstOrDefault();
                tareaEditar.TITULO = tarea.TITULO;
                tareaEditar.NOTAS = tarea.NOTAS;
                tareaEditar.ESTADO = tarea.ESTADO;
                tareaEditar.PRIORIDAD = tarea.PRIORIDAD;
                tareaEditar.FECHA_CREACION = tarea.FECHA_CREACION;
                tareaEditar.FECHA_TERMINO = tarea.FECHA_TERMINO;
                contexto.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
        }

        public void EliminarTarea(int id)
        {
            try
            {
                ContextoDatosDataContext contexto = new ContextoDatosDataContext();
                TAREA tareaEliminar = contexto.TAREA.Where(t => t.ID == id).FirstOrDefault();
                contexto.TAREA.DeleteOnSubmit(tareaEliminar);
                contexto.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
        }

        public void InsertarTarea(TAREA tarea)
        {
            try
            {
                ContextoDatosDataContext contexto = new ContextoDatosDataContext();
                contexto.TAREA.InsertOnSubmit(tarea);
                contexto.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        public IEnumerable<TAREA> ObtenerTareas()
        {
            try
            {
                List<TAREA> listaTareas = new List<TAREA>();
                ContextoDatosDataContext contexto = new ContextoDatosDataContext();
                listaTareas = contexto.TAREA.ToList();
                return listaTareas;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return null;
            }
            
        }
    }
}
