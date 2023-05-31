import React from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";

const DataComponents = (props) => {
	const { data } = props;
	const { id, title, body } = data;
	return (
		<>
			<Card>
				<Card.Body>
					<Link href={`/ssr/${id}`}>
						<Card.Title>
							{id} - {title}
						</Card.Title>
					</Link>
					<Card.Text>{body}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

export default DataComponents;
