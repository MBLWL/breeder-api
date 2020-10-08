const { Invoice } = require("../models/Invoice/Invoice");
const { validateInvoiceInput } = require("../validation/invoice");
class InvoiceController {
    constructor() { }


    async create(req,res){
        const { errors, isValid } =await validateInvoiceInput(req.body);
        // Check validation
        if (!isValid) {
          return res.json({ status: 400, message: "errors present", errors: errors, data: {} });
        }
        const {contactId,date,type}=req.body

        try {      
            const animal = await new Invoice({contactId,date,type,breederId:req.user._id})
            const doc=await animal.save()
            return res.status(200).json({ status: 200, message: "Invoice of animal created successfully", data: doc });
        } catch (err) {
            return res.json({ status: 400, message: "Error in creating Invoice of animal", errors: err, data: {} });
        }
    }

//////////admin
    async getall(req, res) {
        try {
          const invoive_ = await Invoice.find({});
          return res.status(200).json({ status: 200, message: "All Invoices", data: invoive_ });
        } catch (err) {
          return res.json({ status: 400, message: "Error in get Invoices", errors: err, data: {} });
        }
      }

      async deleteall(req,res){
        try {
            const invoive_ = await Invoice.deleteMany({});
            return res.status(200).json({ status: 200, message: "All Invoices deleted successfully", data: invoive_ });
        } catch (err) {
            return res.json({ status: 400, message: "Error in deleting Invoice", errors: err, data: {} });
        }
    }
////////////


async getallbreeder(req, res) {
    try {
      const invoice_= await Invoice.find({breederId:req.user._id});
      return res.status(200).json({ status: 200, message: "All Invoice of breeder",data: invoice_});
    } catch (err) {
      return res.json({ status: 400, message: "Error in get Invoice ", errors: err, data: {} });
    }
  }

  async deleteallbreeder(req,res){
    try {
        const invoice_= await Invoice.deleteMany({breederId:req.user._id});
        return res.status(200).json({ status: 200, message: "All Invoices deleted successfully",data: invoice_});
    } catch (err) {
        return res.json({ status: 400, message: "Error in deleting Invoice", errors: err, data: {} });
    }
}


    async getbyId(req, res){
        try {
          const invoive_ = await Invoice.find({_id:req.params.id});
          if(invoive_ == ''){
            return res.json({ status: 400, message: "Invalid Id",  data: {} }); 
          }
          return res.status(200).json({ status: 200, message: "Invoice", data: invoive_ });
        } catch (err) {
          return res.json({ status: 400, message: "Error in get Invoice", errors: err, data: {} });
        }
      }

      async deletebyId(req,res){
        try {
            const invoive_ = await Invoice.deleteOne({_id:req.params.id});
            return res.status(200).json({ status: 200, message: "Invoice deleted successfully", data: invoive_ });
        } catch (err) {
            return res.json({ status: 400, message: "Error in deleting Invoice", errors: err, data: {} });
        }
    }

    async updatebyId(req,res){
        const {contactId,date,type}=req.body

        try {
            const invoive_ = await Invoice.updateOne({_id:req.params.id},{contactId,date,type});
    
            return res.status(200).json({ status: 200, message: "Invoice updated successfully", data: invoive_ });
        } catch (err) {
            return res.json({ status: 400, message: "Error in updating Invoice", errors: err, data: {} });
        }
    }


    async addInvoice(type, saleId, invoiceNumber) {
      return new Promise(async (resolve, reject) => {
        const invoice = await new Invoice({type, saleId, invoiceNumber});
        invoice.save().then(resolve);
      });
    }
    
};

module.exports = new InvoiceController();