"use client";
import React, { useEffect, useState } from "react";
import PageComponent from "@/components/PageComponent";
import { useInView } from "react-intersection-observer";

const CSRpage = () => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			fetchPosts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	const fetchPosts = async () => {
		const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`;
		const cacheOptions = { next: { revalidate: 3600 } };
		const response = await axios.get(apiUrl, cacheOptions);
		const newPosts = await response.data;
		setPosts((prevPosts) => [...prevPosts, ...newPosts]);
		setCurrentPage((prevPage) => prevPage + 1);
	};

	return (
		<>
			<h1>CSR</h1>
			{posts.map((post) => (
				<PageComponent key={post.id} posts={post} />
			))}
			<div ref={ref} />
		</>
	);
};

export default CSRpage;
