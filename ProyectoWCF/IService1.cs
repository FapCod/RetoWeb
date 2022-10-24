using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace ProyectoWCF
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IService1" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IService1
    {
        [OperationContract]
        IEnumerable<TAREA> ObtenerTareas();
        [OperationContract]
        void InsertarTarea(TAREA tarea);
        [OperationContract]
        void EditarTarea(TAREA tarea);
        [OperationContract]
        void EliminarTarea(int id);
    }
}
