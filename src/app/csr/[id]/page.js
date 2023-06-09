"use client";
import React from "react";
import PageComponent from "./PageComponent";

const page = async ({ params }) => {
	const { id } = params;
	return (
		<>
			<h1>CSR - {id}</h1>
			<PageComponent key={id} id={id} />
		</>
	);
};

export default page;
