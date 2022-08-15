/*
 * 验证类型：身份证、邮箱、金额、数字、中文
 */
const Rules = {
	/*
	 * 验证非空验证
	 * 可验证类型： 数组、对象、字符串
	 */
	empty: data => (Array.isArray(data) && data.length > 0) || (Object.prototype
		.toString.call(data) === '[object Object]' && JSON.stringify(data) !== "{}") || typeof data === 'string' ? data.length > 0 : (data + '').length > 0,

	// 钱
	money: data => /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(data),

	// 汉字
	chinese: data => /^[\u4e00-\u9fa5]{0,}$/.test(data),

	placeholder: () => true
};
const CacheData = (data) => {
	return (rule, {
		type,
		validation,
		success,
		error,
	}) => {
		const pass = validation ? validation(data[rule]) : Rules[type](data[rule])
		pass ? success && success() : error && error()
		return pass;
	}
}
export default (rules, data) => {
	const Validation = CacheData(data)
	for (let rule in rules) {
		if (Array.isArray(rules[rule])) {
			for (let i = 0; i < rules[rule].length; i++) {
				if (!Validation(rule, rules[rule][i])) {
					return false;
				}
			}
		} else {
			if (!Validation(rule, rules[rule])) {
				return false;
			}
		}
	}
	return true;
}