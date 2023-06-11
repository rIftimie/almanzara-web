import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './ReportPDFStylesheet';

import 'src/helpers/momentjs';
import moment from 'moment';

const ReportPDF = ({ report }) => {
	// Convertir fecha
	let localLocale = moment(report.start_date);
	moment.locale('es');
	const date = `${localLocale.format('dddd')}, ${localLocale.format(
		'D'
	)} de ${localLocale.format('MMMM')} de ${localLocale.format('YYYY')}`;

	const time = localLocale.format('HH:mm:ss');

	function sumTimes(time1, time2) {
		const formatted = moment(time1).add(moment.duration(time2));
		return formatted.format('HH:mm:ss');
	}

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text>-LOGO- ALMANZARA CONECTADA S.L</Text>
				</View>
				<View style={styles.divideHalf}>
					<Text>Dehesa de la Almanzara s/n</Text>
					<Text>TLF: 678876678</Text>
				</View>
				<View style={styles.divideHalf}>
					<Text>18000 Granada</Text>
				</View>
				<View style={styles.divideHalf}>
					<Text>CIF: G91984864</Text>
					<Text>N. Idtf Almanzara: 49 / 182.99142</Text>
				</View>
				<View style={styles.divide}>
					<Text>Campaña: 2022/2023</Text>
					<Text>{date}</Text>
				</View>
				<View style={styles.section}>
					<View style={styles.sectionRow}>
						<View style={styles.sectionRow30}>
							<Text>N. Ticket</Text>
							<Text>{report.id}</Text>
						</View>
						<View style={styles.sectionRow70}>
							<Text>Linea: --3--</Text>
							<Text>Aceituna del {report.olive_type}</Text>
						</View>
					</View>
					<View style={styles.sectionRow}>
						<View style={styles.sectionRow30}>
							<Text>TOTAL (gr)</Text>
							<Text>{report.total_gr}</Text>
						</View>
						<View style={styles.sectionRowTime}>
							<View style={styles.sectionRowTimeSection}>
								<Text>Hora de inicio:</Text>
								<Text style={styles.sectionRowSub}>{time}</Text>
							</View>
							<View style={styles.sectionRowTimeSection}>
								<Text>Duracion: </Text>
								<Text style={styles.sectionRowSub}>{report.duration}</Text>
							</View>
							<View style={styles.sectionRowTimeSection}>
								<Text>Hora Final:</Text>
								<Text style={styles.sectionRowSub}>
									{sumTimes(report.start_date, report.duration)}
								</Text>
							</View>
						</View>
					</View>

					<View style={styles.divide}>
						<Text>El Oleicultor</Text>
						<Text>El Pesador</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default ReportPDF;
