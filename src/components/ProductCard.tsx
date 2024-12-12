import React from "react";
import { Card, CardMedia, Typography, IconButton, Box, styled } from "@mui/material";
import { Favorite, FavoriteBorder, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  price,
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
        height="200"
        image={image}
        alt={title}
        style={{
          borderRadius: "12px 12px 0 0",
          objectFit: "cover",
        }}
      />
      <StyledCardContent>
        <StyledTitle gutterBottom variant="h6">
          {title}
        </StyledTitle>
        <StyledDescription variant="body2" color="text.secondary">
          {description}
        </StyledDescription>
        <StyledPrice variant="body2">{price}</StyledPrice>
      </StyledCardContent>
      <StyledBox onClick={(e) => e.stopPropagation()}>
        <IconButton onClick={() => onToggleFavorite()} color="error">
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>

        <IconButton onClick={() => onDelete(id)} color="error">
          <Delete />
        </IconButton>
      </StyledBox>
    </StyledCard>
  );
};

export default ProductCard;

const StyledCard = styled(Card)(({}) => ({
  maxWidth: 370,
  position: "relative",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  height: "500px",
  transition: "transform 0.3s, box-shadow 0.3s",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledCardContent = styled("div")({
  flexGrow: 1,
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 16px",
  borderTop: "1px solid #e0e0e0",
  backgroundColor: "#fafafa",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
});

const StyledDescription = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  flexGrow: 1,
  marginBottom: "8px",
	fontSize: "13.5px"
});

const StyledTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: 1.2,
  marginBottom: "4px",
});

const StyledPrice = styled(Typography)({
  fontWeight: "bold",
  fontSize: "18px",
  color: "#333",
  marginTop: "8px",
});
