"use client";
import PageComponents from "@/components/PageComponents";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const DataFetchingComponent = () => {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	const fetchData = async () => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts?_page=${page}`,
		);
		const newData = await response.json();
		setData((prevData) => [...prevData, ...newData]);
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<>
			{data.map((x) => (
				<PageComponents key={x.id} data={x} />
			))}
			<div ref={ref} />
		</>
	);
};

export default DataFetchingComponent;
