"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PageComponent from "@/components/PageComponent";

const CsrPageComponent = () => {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [ref, inView] = useInView();

	const fetchPosts = async () => {
		// getStaticProps
		const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`;
		const response = await fetch(apiUrl);
		const newPosts = await response.json();
		setData((prevPosts) => [...prevPosts, ...newPosts]);
		setCurrentPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		if (inView) {
			fetchPosts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, inView]);

	return (
		<>
			{data.map((data) => (
				<PageComponent key={data.id} posts={data} link={`/csr`} />
			))}
			<div ref={ref} />
		</>
	);
};

export default CsrPageComponent;
