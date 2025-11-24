import { FiLoader } from "react-icons/fi";

const Spinner = () => {
	return (
		<div className="text-blue-600">
			<FiLoader className="animate-spin text-4xl" />
		</div>
	);
};

export { Spinner };
