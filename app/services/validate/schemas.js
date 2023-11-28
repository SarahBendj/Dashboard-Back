const Joi = require("joi");

const simpleFormat = /^[a-zA-Z0-9éèà' -]{2,30}$/;
const emailValidator =
  /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordValidator =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
const identificantValidator = /^[a-zA-Z]{2,30}[0-9]{1,5}$/

//new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})')

/**********************FRIDGE */
const FridgeOrGoods = Joi.object({
  name: Joi.string().pattern(simpleFormat).required(),
  temperature_required: Joi.number().max(20).required().messages({
    "number.base": "this must be a number",
    "number.max": "please, enter a valid temperature",
    "any.required": "please, enter a temperature"
  }),
});


/*************************USER*/
const AddUser = Joi.object({
  firstname: Joi.string().min(2).pattern(simpleFormat).required().messages({
    "string.base": "this must be a valid firstname",
    "string.min": "please, enter a firstname with at least 2 characters",
    "string.pattern.base": "please, enter a valid firstname",
    "string.required": "please enter a firstname"
  }),

  lastname: Joi.string().min(2).max(30).required().messages({
    "string.base": " please enter a valid lastname",
    "string.min": "lastname should be at least 2 characters long",
    "string.max": "lastname should not be over than  30 characters long",
    "string.required": "please enter a lastname "
  }),
  email: Joi.string().pattern(emailValidator).required().messages({
    "string.base": " please enter a valid email",
    "string.pattern.base": " please enter a correct email",
    "string.required": "please enter an email"
  }),
  role: Joi.string().max(10).required().messages({
    "string.base": " please enter a valid email",
    "string.max": " role should not have more characters that 10",
    "string.required": "please enter an email"
  }),
  
});
const Login = Joi.object({
  identificant: Joi.string().pattern(identificantValidator).required().messages({
    "string.base": " please enter a valid identificant /password",
    "string.pattern.base": " identificant or password incorrect",
    "string.required": " identificant or password incorrect"}),
  password: Joi.string().required().messages({
    "string.base":"message de base",
    "string.required": "identificant or password incorrect"
  }),
});
/**********************CHAGING PASSWORD */
const changePassword = Joi.object({
  oldPassword: Joi.string().required().messages({
    "string.required": "please enter the oldpassword "
  }),
  newPassword: Joi.string()
    .pattern(passwordValidator)
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "password should contain 8 characters which has at least 1 uppercase letter , 1 number , 1 special characters ",
      "string.required": "please enter the Newpassword "
    }),
});

/*************************SUPPLIER */
const Supplier = Joi.object({
  name: Joi.string().min(2).pattern(simpleFormat).messages({
    "string.base": " please enter a valid name",
    "string.min": "name should be at least 2 characters long",
    "string.pattern.base": "please entrer a correct name"
  }),

  contact: Joi.string().pattern(emailValidator).messages({
    "string.base": " please enter a valid email",
    "string.pattern.base": " please enter a correct email",
    "string.required": "please enter an email"
  }),
});

const Reception = Joi.object({
  temperature: Joi.number().max(20).required().messages({
    "number.base": "this must be a number",
    "number.max": "please, enter a valid temperature",
    "any.required": "please, enter a temperature"
  }),
  description: Joi.string().min(3).messages({
    "string.base": "description must be a string",
    "string.min": "description must be at least 3 characters long",
  
  }),
  vehicle_compliance: Joi.boolean().required().messages({
    "any.required": "packaging_condition must be declared"
  }),
  packaging_condition: Joi.boolean().required().messages({
    "any.required": "packaging_condition must be declared"
  }),

  expiration_date: Joi.boolean().required().messages({
    "any.required": "packaging_condition must be declared",
  }),
  goods_id: Joi.number().required().messages({
    "any.required": "goods_id is required",
    "number.base": "goods_id must be a number",
  }),
  supplier_id: Joi.number().required().messages({
    "any.required": "supplier_id is required",
    "number.base": "supplier_id must be a number",
  }),
  app_user_id: Joi.number().required().messages({
    "any.required": "app_user_id is required",
    "number.base": "app_user_id must be a number",
  }),
});
const Warning = Joi.object({
  description: Joi.string().required().min(3).messages({
    "string.base": "description must be a string",
    "string.min": "description must be at least 3 characters long",
    "any.required": "please, enter a description"
  }),
  warning_status: Joi.boolean()
  
});

module.exports = {
  Login,
  Supplier,
  FridgeOrGoods,
  AddUser,
  changePassword,
  Reception,
  Warning
};
