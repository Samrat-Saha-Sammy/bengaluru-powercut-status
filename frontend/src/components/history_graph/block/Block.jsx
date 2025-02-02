const Block = ({ identifier, color }) => {
	const handleBlockClick = () => {
		//
	};

	return (
		<div
			className={`w-[12px] h-[12px] rounded-full`}
			key={identifier}
			style={{ backgroundColor: color }}
		/>
	);
};

export default Block;
