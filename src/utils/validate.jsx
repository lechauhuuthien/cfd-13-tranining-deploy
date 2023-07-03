// rules = {
//     name: [
//         {required: true, message: 'Vui lòng ...'}
//     ],
//     email: [
//         {required: true, message: 'Vui lòng ...'},
//         {regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Vui lòng ...'},
//     ]
// }

// form = {
//     name: 'Thien Le',
//     email: 'thienle@gmail.com'
// }

// errorObj = {
//     name: 'Vui lòng...',
//     email: 'Vui lòng...'
// }

export const validate = (rules, values) => {
  let errObj = {};

  for (const ruleKey in rules) {
    for (const rule of rules[ruleKey]) {
      if (rule.required) {
        const errorMessage = requiredValidate(values[ruleKey], rule.message);
        if (errorMessage) {
          errObj[ruleKey] = errorMessage;
          break;
        }
      }

      if (rule.regex instanceof RegExp) {
        const errorMessage = regexValidate(
          values[ruleKey],
          rule.regex,
          rule.message
        );
        if (errorMessage) {
          errObj[ruleKey] = errorMessage;
          break;
        }
      }
    }
  }

  return errObj;
};

const requiredValidate = (value, message) => {
  if (!!!value) {
    return message || "Vui lòng điền thông tin";
  }
};

const regexValidate = (value, regex, message) => {
  if (!!!regex.test(value)) {
    return message || "Vui lòng điền đúng định dạng thông tin";
  }
};
