import React, { useEffect, useState } from "react";
import { Typography, Button, styled, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		const redirectTimer = setTimeout(() => {
			navigate("/products");
		}, 5000);

		return () => {
			clearInterval(timer);
			clearTimeout(redirectTimer);
		};
	}, [navigate]);

	return (
		<FullScreenContainer>
			<ContentWrapper>
				<StyledTitle variant="h1">404</StyledTitle>
				<StyledSubtitle variant="h2">Страница не найдена</StyledSubtitle>
				<StyledDescription variant="body1">
					Извините, но запрашиваемая страница не существует.
				</StyledDescription>
				<StyledCountdown variant="body2">
					Вы будете перенаправлены на главную страницу через {countdown}{" "}
					{countdown === 1 ? "секунду" : "секунд"}.
				</StyledCountdown>
				<StyledButton variant="contained" onClick={() => navigate("/")}>
					Вернуться на главную страницу
				</StyledButton>
			</ContentWrapper>
		</FullScreenContainer>
	);
};

export default NotFound;

const FullScreenContainer = styled(Box)(({}) => ({
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
	color: "#fff",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
	textAlign: "center",
	padding: theme.spacing(4),
	maxWidth: "800px",
	margin: "0 auto",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
	fontSize: "10rem",
	fontWeight: "bold",
	color: "#fff",
	marginBottom: theme.spacing(2),
	textShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
	fontSize: "3rem",
	color: "#ffebee",
	marginBottom: theme.spacing(4),
	textShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
	fontSize: "1.5rem",
	marginBottom: theme.spacing(4),
	color: "#ffebee",
}));

const StyledCountdown = styled(Typography)(({ theme }) => ({
	fontSize: "1.2rem",
	marginBottom: theme.spacing(4),
	color: "#ffebee",
}));

const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: "#fff",
	color: "#ff416c",
	fontWeight: "bold",
	padding: theme.spacing(2, 6),
	fontSize: "1.2rem",
	borderRadius: "50px",
	transition: "all 0.3s ease",
	"&:hover": {
		backgroundColor: "#ffebee",
		color: "#ff416c",
		transform: "scale(1.05)", 
	},
}));