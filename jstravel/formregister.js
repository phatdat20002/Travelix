function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var formRules = {};
    function validate(inputElement, rule) {
        var errorMessage;
        var rules = formRules[rule.selector];
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
        var errorElement = getParent(inputElement, '.form-group').querySelector(options.errorElement);
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, '.form-group').classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, '.form-group').classList.remove('invalid');
        }
        return !errorMessage;
    }

    var formElement = document.getElementById(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            var isValid = true;
            e.preventDefault();
            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                var isError = validate(inputElement, rule);
                if (!isError) {
                    isValid = false;
                }
            });

            if (isValid) {
                if (typeof options.onsubmit === 'function') {
                    var resultValue = {};
                    var isNable = document.querySelectorAll('[name]');
                    Array.from(isNable).forEach(input => {
                        switch (input.type) {
                            case 'radio':
                            case 'checkbox':
                                {
                                    resultValue[input.name] = document.querySelector('input[name="' + input.name + '"]:checked').value;
                                }
                                break;
                            default:
                                resultValue[input.name] = input.value;
                        }
                    });
                    options.onsubmit(resultValue);
                }
            }
        };

        options.rules.forEach(rule => {
            if (Array.isArray(formRules[rule.selector])) {
                formRules[rule.selector].push(rule.test);
            } else {
                formRules[rule.selector] = [rule.test];
            }
            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(inputElement => {
                if (inputElement) {
                    var errorMessage = rule.test(inputElement.value);
                    var errorElement = getParent(inputElement, '.form-group').querySelector(options.errorElement);
                    inputElement.onblur = function () {
                        validate(inputElement, rule);
                    };
                    inputElement.oninput = function () {
                        errorElement.innerText = '';
                        getParent(inputElement, '.form-group').classList.remove('invalid');
                    };
                }
            });
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector,
        test: function (v) {
            return v ? undefined : message || 'Vui lòng nhập trường này!';
        }
    };
};

Validator.isEmail = function (selector) {
    return {
        selector,
        test: function (v) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(v) ? undefined : 'Vui lòng nhập Email hợp lệ!';
        }
    };
};

Validator.isMin = function (selector, min) {
    return {
        selector,
        test: function (v) {
            return v.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
};

Validator.isConfirmation = function (selector, getConfir) {
    return {
        selector,
        test: function (v) {
            return v === getConfir() ? undefined : 'Vui lòng nhập đúng giá trị';
        }
    };
};
