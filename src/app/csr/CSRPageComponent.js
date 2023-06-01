"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";

const CSRPageComponent = () => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [ref, inView] = useInView();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (inView) {
			const fetchPosts = async () => {
				setLoading(true);
				const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`;
				const cacheOptions = { next: { revalidate: 3600 } };
				const response = await axios.get(apiUrl, cacheOptions);
				const newPosts = await response.data;
				setPosts((prevPosts) => [...prevPosts, ...newPosts]);
				setCurrentPage((prevPage) => prevPage + 1);
				setLoading(false);
			};
			fetchPosts();
		}
	}, [currentPage, inView]);

	return (
		<>
			<h1>CSR</h1>
			{posts.map((post) => (
				<Card className="mb-3" key={post.id}>
					<Card.Body>
						<Link href={`/ssr/${post.id}`}>
							<Card.Title>
								{post.id}.{post.title}
							</Card.Title>
						</Link>
						<Card.Text>{post.body}</Card.Text>
					</Card.Body>
				</Card>
			))}
			{loading && <p>Loading...</p>}
			<div ref={ref} />
		</>
	);
};

export default CSRPageComponent;
