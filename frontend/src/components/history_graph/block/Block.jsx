import { memo } from "react";
const Block = memo(({ identifier, color, data }) => {
	const handleBlockClick = (e) => {
		//console.log(data.date);
	};

	return (
		<div
			className={`w-[12px] h-[12px] rounded-full`}
			key={identifier}
			style={{ backgroundColor: color }}
			onClick={handleBlockClick}
		/>
	);
});

export default Block;
