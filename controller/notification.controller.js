const { sendMessage, sendBulkMessage } = require("../misc/fcm");
const { Notification } = require("../models/Notification/Notification");
const { User } = require("../models/User");

const { validateNotificationInput } = require("../validation/notification");
const userController = require("./user.controller");

class NotificationController {
  constructor() {
    this.createNotif = this.createNotif.bind(this);
    this.create = this.create.bind(this);
    this.createMultiple = this.createMultiple.bind(this);
    this.addNotification = this.addNotification.bind(this);
  }

  transformData(data) {
    console.log(data);
    return {
      //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: data.deviceToken,
      // collapse_key: 'your_collapse_key',
      notification: {
        title: data.title,
        body: data.description,
      },
      data: data.data,
    };
  }

  async create(data, isPush) {
    // const d = {
    //   deviceToken,
    //   title,
    //   description,
    //   data,
    //   userId,
    //   breederId,
    //   notificationType,
    //   animalIdoremployeeId,
    // }
    return new Promise(async (resolve, reject) => {
      if (isPush) sendBu(this.transformData(data));

      const notifications = await new Notification(data);
      await notifications
        .save()
        .then((resultNotification) => {
          resolve(resultNotification);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async createMultiple(data, isPush) {  
    return new Promise(async (resolve, reject) => {
      console.log('Transforming data: ');
      console.log(this.transformData(data));
      if (isPush) sendBulkMessage(data.map(e => ({token: e.deviceToken, title: e.title, description: e.description, data: e.data})));
      Notification.insertMany(data, (error, result) => {

        if (error) reject(error);
        resolve(result);
      });
    });
  }


  async NotifTest() {
    return new Promise(async (resolve, reject) => {
      sendBulkMessage([
        {
          token:
            "ExponentPushToken[mn1etSOV8gRoj0sNXQ4_0o]",
          title: "Test notification from server",
          description: "This is test notification from the server",
          data: {},
        },
        // {
        //   token:
        //     "fNrQ4OAkiXQQ16yftO2Nun:APA91bHt_qs8M8-L8r6icE1lDJgxNr3lACP93EoUQPr125JPULT0E3K2d0E8R7_ugf8yPYK-v1zTvzR8RTAfw2IfzJGGrUmLDrtJN5ljA8I00dpAjIUg1B4ryYQOmkmYBx-vbd4o-u8m",
        //   title: "Test notification from server",
        //   description: "This is test notification from the server",
        //   data: {},
        // },
      ]);
      resolve(true);
    });
  }

  async createNotif(req, res) {
    console.log("in create notif");
    this.NotifTest().then((result) => {
      return res
        .status(200)
        .json({ status: 200, message: "Notification created successfully" });
    });
  }



















  // Notificaiton routes...

  //breeder create notifications
  async addNotification(req, res) {
    console.log(req.body);
    const { errors, isValid } = validateNotificationInput(req.body);
    // Check validation
    if (!isValid) {
      return res.json({
        status: 400,
        message: "errors present",
        errors: errors,
        data: {},
      });
    }
    try {
      if (req.user.role.includes("breeder")) {
        if (req.body.employees === "all") {
          // userController.getAllEmployeesOfBreeder(req.user._id).then(allEmployees => {
          // allEmployees.map((employee) => {
          //   this.create(employee._id, 'mynotification',  'employee', 'Employee Registered Successfully', 'You have registered a new employee', req.user._id, null, success.data._id, req.user.deviceToken, true).then(resultNotifCreate => { });
          // });

          User.find({ breederId, role: "employee" })
            .then((allEmployees) => {
              // console.log(allEmployees);

              // const d = {
              //   deviceToken,
              //   title,
              //   description,
              //   data,
              //   userId,
              //   breederId,
              //   notificationType,
              //   animalIdoremployeeId,
              // }

              const data = allEmployees.map(e => e.toObject()).map((e) => ({
                ...e,
                title: req.body.title,
                description: req.body.description,
                userId: req.user._id,
                breederId: req.user._id,
                notificationType: req.body.notificationType,
                notificationSubType: req.body.notificationSubType,
                data: {},
                employeeId: e._id,
                // ...(req.body.notificationType === "animal" ? {animalId: } : {}),
                // ...(req.body.notificationType === "employee" ? employeeId : {}),
              }));
              console.log(data);

              this.createMultiple(data, true).then(resultNotif => {
                return res.status(200).json({
                  status: 200,
                  message: "Notification created successfully",
                });
              }).catch(error => {
                console.log(error);
              });

              // this.sendNotifToAllEmployees(
              //   allEmployees,
              //   req.body.title,
              //   req.body.description,
              //   req.user._id,
              //   true
              // ).then((allOk) => {
              //   console.log(allOk);
              //   return res.status(200).json({
              //     status: 200,
              //     message: "Notification created successfully",
              //   });
              // });
            })
            .catch((error) => {});
        } else {
          this.sendNotifToAllEmployees(
            employees,
            req.body.title,
            req.body.description,
            req.user._id
          ).then((allOk) => {
            console.log(allOk);
            return res.status(200).json({
              status: 200,
              message: "Notification created successfully",
            });
          });
        }
      } else {
      }
      // const notifications= await new Notification(req.body)
      // const doc=await notifications.save()
      // return res.status(200).json({ status: 200, message: "Notification created successfully", data: doc });
    } catch (err) {
      console.log(err);
      return res.json({
        status: 400,
        message: "Error in creating Notification",
        errors: err,
        data: {},
      });
    }
  }
}

module.exports = new NotificationController();
