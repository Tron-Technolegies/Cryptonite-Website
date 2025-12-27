import axiosClient from "./axiosClient";

const invoicesApi = {
  // List invoices
  getMyInvoices: () => axiosClient.get("/invoices/"),

  // Download invoice (PDF)
  downloadInvoice: (id) =>
    axiosClient.get(`/invoices/${id}/download/`, {
      responseType: "blob",
    }),
};

export default invoicesApi;