using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using Lawnhiro_WebApp.Models;

namespace Lawnhiro_WebApp.DAL
{
    public class AccessOrders
    {
        public List<Orders> getActiveOrders()
        {
            List<Orders> activeOrders = new List<Orders>();
            System.Configuration.Configuration rootWebConfig = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("/Lawnhiro_WebApp");
            System.Configuration.ConnectionStringSettings connString;

            connString = rootWebConfig.ConnectionStrings.ConnectionStrings["LawnhiroConnectionString"];

            using (SqlConnection con = new SqlConnection(connString.ConnectionString))
            {
                con.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM LawnhiroOrders", con))
                {
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        int orderId = reader.GetInt32(0);    // Weight int
                        DateTime orderDate = reader.GetDateTime(1).Date;  // Name string
                        TimeSpan orderTime = reader.GetTimeSpan(2); // Breed string
                        string businessSource = reader.GetString(3);
                        string payPalOrderId = reader.GetString(4);
                        string name = reader.GetString(5);
                        string address1 = reader.GetString(6);
                        string address2 = reader.IsDBNull(7) ? "" : reader.GetString(7);
                        string city = reader.GetString(8);
                        string state = reader.GetString(9);
                        string zip = reader.GetString(10);
                        string serviceType = reader.GetString(11);
                        double calculationResultArea = reader.GetDouble(12);
                        double calculationResultPrice = reader.GetDouble(13);
                        string customerNotes = reader.IsDBNull(14) ? "" : reader.GetString(14);
                        string providerNotes = reader.IsDBNull(15) ? "" : reader.GetString(15);
                        bool active = reader.GetBoolean(16);

                        activeOrders.Add(new Orders()
                        {
                            OrderID = orderId,
                            OrderDate = orderDate,
                            OrderTime = orderTime,
                            BusinessSource = businessSource,
                            PayPalOrderID = payPalOrderId,
                            Name = name,
                            Address1 = address1,
                            Address2 = address2,
                            City = city,
                            State = state,
                            Zip = zip,
                            ServiceType = serviceType,
                            CalculationResultArea = calculationResultArea,
                            CalculationResultPrice = calculationResultPrice,
                            CustomerNotes = customerNotes,
                            ProviderNotes = providerNotes,
                            Active = active
                        });
                    }
                }
                con.Close();
            }
            return activeOrders;
        }
    }
}