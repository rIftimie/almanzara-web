import './Footer.css';

const Footer = () => {
	return (
		<footer id="mainFooter" className="text-black bg-testBackground-100">
			<ul className="flex flex-col justify-center items-center py-2 text-sm sm:justify-around sm:flex-row">
				<li>Departamento de Informática</li>
				<li>I.E.S Hermeneguildo Lanz</li>
				<li>Departamento de Electrónica</li>
			</ul>
		</footer>
	);
};

export default Footer;
