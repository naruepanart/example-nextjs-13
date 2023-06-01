"use client";
import PageComponents from "@/components/PageComponents";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const page = () => {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			fetchData();
		}
	}, [inView]);

	const fetchData = async () => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts?_page=${page}`,
			{ next: { revalidate: 3600 } },
		);
		const newData = await response.json();
		setData((prevData) => [...prevData, ...newData]);
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<>
			<h1>CSR</h1>
			{data.map((item) => (
				<PageComponents key={item.id} posts={item} />
			))}
			<div ref={ref} />
		</>
	);
};

export default page;
