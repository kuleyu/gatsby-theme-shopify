export const removeCareInstructions = (desc) => desc.split(/Care Instructions/).slice(0, 1).join('');

export const cutDescriptionShort = (desc, limit) => {
	if (desc.length > limit) {
		return `${desc.slice(0, limit).trim()}...`;
	}

	return desc;
};

export const debounce = (delay, fn) => {
	let timeout;

	return function(...args) {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			fn(...args);
			timeout = null;
		}, delay);
	};
};

export const hex2rgba = (hex, op) => {
	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length === 3) {
			c = [ c[0], c[0], c[1], c[1], c[2], c[2] ];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [ (c >> 16) & 255, (c >> 8) & 255, c & 255 ].join(',') + `,${op || 1})`;
	}
	throw new Error('Bad Hex');
};
