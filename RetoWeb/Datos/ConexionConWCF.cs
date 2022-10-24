using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace RetoWeb.Datos
{
    public class ConexionConWCF
    {
        public ServiceReference1.Service1Client ConexionWCF()
        {
            WSHttpBinding basicHttpBinding = new WSHttpBinding();
            basicHttpBinding.Security.Mode = SecurityMode.None;
            basicHttpBinding.Name = "MetadataExchangeHttpBinding_IService1";
            EndpointAddress endpointAddress = new EndpointAddress("http://localhost/Service1.svc/mex");
            return new ServiceReference1.Service1Client(basicHttpBinding, endpointAddress);
        }
    }
}