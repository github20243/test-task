import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	IconButton,
	Box,
	styled,
} from "@mui/material";
import { Favorite, FavoriteBorder, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
	id: number;
	title: string;
	description: string;
	image: string;
	isFavorite: boolean;
	onToggleFavorite: () => void;
	onDelete: () => void;
}

const StyledCard = styled(Card)({
	maxWidth: 345,
	margin: "20px",
	position: "relative",
	cursor: "pointer",
	display: "flex",
	flexDirection: "column",
	height: "100%",
	transition: "transform 0.3s, box-shadow 0.3s",
	borderRadius: "12px",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
	"&:hover": {
		transform: "translateY(-5px)",
		boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
	},
});

const StyledCardContent = styled(CardContent)({
	flexGrow: 1,
});

const StyledBox = styled(Box)({
	display: "flex",
	justifyContent: "space-between",
	padding: "8px",
	borderTop: "1px solid #e0e0e0",
});

const ProductCard: React.FC<ProductCardProps> = ({
	id,
	title,
	description,
	image,
	isFavorite,
	onToggleFavorite,
	onDelete,
}) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/products/${id}`);
	};

	return (
		<StyledCard onClick={handleCardClick}>
			<CardMedia
				component="img"
				height="140"
				image={image}
				alt={title}
				style={{ borderRadius: "12px 12px 0 0" }}
			/>
			<StyledCardContent>
				<Typography
					gutterBottom
					variant="h6"
					component="div"
					sx={{ fontWeight: "bold" }}>
					{title}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
					}}>
					{description}
				</Typography>
			</StyledCardContent>
			<StyledBox onClick={(e) => e.stopPropagation()}>
				<IconButton onClick={onToggleFavorite} color="primary">
					{isFavorite ? <Favorite /> : <FavoriteBorder />}
				</IconButton>
				<IconButton onClick={onDelete} color="error">
					<Delete />
				</IconButton>
			</StyledBox>
		</StyledCard>
	);
};

export default ProductCard;
