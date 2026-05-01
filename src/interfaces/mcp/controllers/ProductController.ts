import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetProductsUseCase } from "../../../application/use-cases/products/GetProducts";
import { GetProductUseCase } from "../../../application/use-cases/products/GetProduct";
import { CreateProductUseCase } from "../../../application/use-cases/products/CreateProduct";
import { UpdateProductUseCase } from "../../../application/use-cases/products/UpdateProduct";
import { DeleteProductUseCase } from "../../../application/use-cases/products/DeleteProduct";
import { BatchProductsUseCase } from "../../../application/use-cases/products/BatchProducts";
import { GetProductVariationsUseCase } from "../../../application/use-cases/products/variations/GetProductVariations";
import { GetProductVariationUseCase } from "../../../application/use-cases/products/variations/GetProductVariation";
import { CreateProductVariationUseCase } from "../../../application/use-cases/products/variations/CreateProductVariation";
import { UpdateProductVariationUseCase } from "../../../application/use-cases/products/variations/UpdateProductVariation";
import { DeleteProductVariationUseCase } from "../../../application/use-cases/products/variations/DeleteProductVariation";
import { GetProductAttributesUseCase } from "../../../application/use-cases/products/attributes/GetProductAttributes";
import { GetProductAttributeUseCase } from "../../../application/use-cases/products/attributes/GetProductAttribute";
import { CreateProductAttributeUseCase } from "../../../application/use-cases/products/attributes/CreateProductAttribute";
import { UpdateProductAttributeUseCase } from "../../../application/use-cases/products/attributes/UpdateProductAttribute";
import { DeleteProductAttributeUseCase } from "../../../application/use-cases/products/attributes/DeleteProductAttribute";
import { GetAttributeTermsUseCase } from "../../../application/use-cases/products/attributes/terms/GetAttributeTerms";
import { GetAttributeTermUseCase } from "../../../application/use-cases/products/attributes/terms/GetAttributeTerm";
import { CreateAttributeTermUseCase } from "../../../application/use-cases/products/attributes/terms/CreateAttributeTerm";
import { UpdateAttributeTermUseCase } from "../../../application/use-cases/products/attributes/terms/UpdateAttributeTerm";
import { DeleteAttributeTermUseCase } from "../../../application/use-cases/products/attributes/terms/DeleteAttributeTerm";
import { GetProductCategoriesUseCase } from "../../../application/use-cases/products/categories/GetProductCategories";
import { GetProductCategoryUseCase } from "../../../application/use-cases/products/categories/GetProductCategory";
import { CreateProductCategoryUseCase } from "../../../application/use-cases/products/categories/CreateProductCategory";
import { UpdateProductCategoryUseCase } from "../../../application/use-cases/products/categories/UpdateProductCategory";
import { DeleteProductCategoryUseCase } from "../../../application/use-cases/products/categories/DeleteProductCategory";
import { GetProductTagsUseCase } from "../../../application/use-cases/products/tags/GetProductTags";
import { GetProductTagUseCase } from "../../../application/use-cases/products/tags/GetProductTag";
import { CreateProductTagUseCase } from "../../../application/use-cases/products/tags/CreateProductTag";
import { UpdateProductTagUseCase } from "../../../application/use-cases/products/tags/UpdateProductTag";
import { DeleteProductTagUseCase } from "../../../application/use-cases/products/tags/DeleteProductTag";
import { GetProductReviewsUseCase } from "../../../application/use-cases/products/reviews/GetProductReviews";
import { GetProductReviewUseCase } from "../../../application/use-cases/products/reviews/GetProductReview";
import { CreateProductReviewUseCase } from "../../../application/use-cases/products/reviews/CreateProductReview";
import { UpdateProductReviewUseCase } from "../../../application/use-cases/products/reviews/UpdateProductReview";
import { DeleteProductReviewUseCase } from "../../../application/use-cases/products/reviews/DeleteProductReview";

export class ProductController {
  private getProductsUseCase: GetProductsUseCase;
  private getProductUseCase: GetProductUseCase;
  private createProductUseCase: CreateProductUseCase;
  private updateProductUseCase: UpdateProductUseCase;
  private deleteProductUseCase: DeleteProductUseCase;
  private batchProductsUseCase: BatchProductsUseCase;
  private getProductVariationsUseCase: GetProductVariationsUseCase;
  private getProductVariationUseCase: GetProductVariationUseCase;
  private createProductVariationUseCase: CreateProductVariationUseCase;
  private updateProductVariationUseCase: UpdateProductVariationUseCase;
  private deleteProductVariationUseCase: DeleteProductVariationUseCase;
  private getProductAttributesUseCase: GetProductAttributesUseCase;
  private getProductAttributeUseCase: GetProductAttributeUseCase;
  private createProductAttributeUseCase: CreateProductAttributeUseCase;
  private updateProductAttributeUseCase: UpdateProductAttributeUseCase;
  private deleteProductAttributeUseCase: DeleteProductAttributeUseCase;
  private getAttributeTermsUseCase: GetAttributeTermsUseCase;
  private getAttributeTermUseCase: GetAttributeTermUseCase;
  private createAttributeTermUseCase: CreateAttributeTermUseCase;
  private updateAttributeTermUseCase: UpdateAttributeTermUseCase;
  private deleteAttributeTermUseCase: DeleteAttributeTermUseCase;
  private getProductCategoriesUseCase: GetProductCategoriesUseCase;
  private getProductCategoryUseCase: GetProductCategoryUseCase;
  private createProductCategoryUseCase: CreateProductCategoryUseCase;
  private updateProductCategoryUseCase: UpdateProductCategoryUseCase;
  private deleteProductCategoryUseCase: DeleteProductCategoryUseCase;
  private getProductTagsUseCase: GetProductTagsUseCase;
  private getProductTagUseCase: GetProductTagUseCase;
  private createProductTagUseCase: CreateProductTagUseCase;
  private updateProductTagUseCase: UpdateProductTagUseCase;
  private deleteProductTagUseCase: DeleteProductTagUseCase;
  private getProductReviewsUseCase: GetProductReviewsUseCase;
  private getProductReviewUseCase: GetProductReviewUseCase;
  private createProductReviewUseCase: CreateProductReviewUseCase;
  private updateProductReviewUseCase: UpdateProductReviewUseCase;
  private deleteProductReviewUseCase: DeleteProductReviewUseCase;

  constructor(private client: WooCommerceClient) {
    this.getProductsUseCase = new GetProductsUseCase(client);
    this.getProductUseCase = new GetProductUseCase(client);
    this.createProductUseCase = new CreateProductUseCase(client);
    this.updateProductUseCase = new UpdateProductUseCase(client);
    this.deleteProductUseCase = new DeleteProductUseCase(client);
    this.batchProductsUseCase = new BatchProductsUseCase(client);
    this.getProductVariationsUseCase = new GetProductVariationsUseCase(client);
    this.getProductVariationUseCase = new GetProductVariationUseCase(client);
    this.createProductVariationUseCase = new CreateProductVariationUseCase(client);
    this.updateProductVariationUseCase = new UpdateProductVariationUseCase(client);
    this.deleteProductVariationUseCase = new DeleteProductVariationUseCase(client);
    this.getProductAttributesUseCase = new GetProductAttributesUseCase(client);
    this.getProductAttributeUseCase = new GetProductAttributeUseCase(client);
    this.createProductAttributeUseCase = new CreateProductAttributeUseCase(client);
    this.updateProductAttributeUseCase = new UpdateProductAttributeUseCase(client);
    this.deleteProductAttributeUseCase = new DeleteProductAttributeUseCase(client);
    this.getAttributeTermsUseCase = new GetAttributeTermsUseCase(client);
    this.getAttributeTermUseCase = new GetAttributeTermUseCase(client);
    this.createAttributeTermUseCase = new CreateAttributeTermUseCase(client);
    this.updateAttributeTermUseCase = new UpdateAttributeTermUseCase(client);
    this.deleteAttributeTermUseCase = new DeleteAttributeTermUseCase(client);
    this.getProductCategoriesUseCase = new GetProductCategoriesUseCase(client);
    this.getProductCategoryUseCase = new GetProductCategoryUseCase(client);
    this.createProductCategoryUseCase = new CreateProductCategoryUseCase(client);
    this.updateProductCategoryUseCase = new UpdateProductCategoryUseCase(client);
    this.deleteProductCategoryUseCase = new DeleteProductCategoryUseCase(client);
    this.getProductTagsUseCase = new GetProductTagsUseCase(client);
    this.getProductTagUseCase = new GetProductTagUseCase(client);
    this.createProductTagUseCase = new CreateProductTagUseCase(client);
    this.updateProductTagUseCase = new UpdateProductTagUseCase(client);
    this.deleteProductTagUseCase = new DeleteProductTagUseCase(client);
    this.getProductReviewsUseCase = new GetProductReviewsUseCase(client);
    this.getProductReviewUseCase = new GetProductReviewUseCase(client);
    this.createProductReviewUseCase = new CreateProductReviewUseCase(client);
    this.updateProductReviewUseCase = new UpdateProductReviewUseCase(client);
    this.deleteProductReviewUseCase = new DeleteProductReviewUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_products":
        return this.getProductsUseCase.execute(params);
      case "get_product":
        return this.getProductUseCase.execute(params.productId);
      case "create_product":
        return this.createProductUseCase.execute(params.productData);
      case "update_product":
        return this.updateProductUseCase.execute(params.productId, params.productData);
      case "delete_product":
        return this.deleteProductUseCase.execute(params.productId, params.force);
      case "batch_products":
        return this.batchProductsUseCase.execute(params.batchData);
      
      // Variations
      case "get_product_variations":
        return this.getProductVariationsUseCase.execute(params);
      case "get_product_variation":
        return this.getProductVariationUseCase.execute(params);
      case "create_product_variation":
        return this.createProductVariationUseCase.execute(params);
      case "update_product_variation":
        return this.updateProductVariationUseCase.execute(params);
      case "delete_product_variation":
        return this.deleteProductVariationUseCase.execute(params);

      // Attributes
      case "get_product_attributes":
        return this.getProductAttributesUseCase.execute();
      case "get_product_attribute":
        return this.getProductAttributeUseCase.execute(params);
      case "create_product_attribute":
        return this.createProductAttributeUseCase.execute(params);
      case "update_product_attribute":
        return this.updateProductAttributeUseCase.execute(params);
      case "delete_product_attribute":
        return this.deleteProductAttributeUseCase.execute(params);

      // Attribute Terms
      case "get_attribute_terms":
        return this.getAttributeTermsUseCase.execute(params);
      case "get_attribute_term":
        return this.getAttributeTermUseCase.execute(params);
      case "create_attribute_term":
        return this.createAttributeTermUseCase.execute(params);
      case "update_attribute_term":
        return this.updateAttributeTermUseCase.execute(params);
      case "delete_attribute_term":
        return this.deleteAttributeTermUseCase.execute(params);

      // Categories
      case "get_product_categories":
        return this.getProductCategoriesUseCase.execute(params);
      case "get_product_category":
        return this.getProductCategoryUseCase.execute(params);
      case "create_product_category":
        return this.createProductCategoryUseCase.execute(params);
      case "update_product_category":
        return this.updateProductCategoryUseCase.execute(params);
      case "delete_product_category":
        return this.deleteProductCategoryUseCase.execute(params);

      // Tags
      case "get_product_tags":
        return this.getProductTagsUseCase.execute(params);
      case "get_product_tag":
        return this.getProductTagUseCase.execute(params);
      case "create_product_tag":
        return this.createProductTagUseCase.execute(params);
      case "update_product_tag":
        return this.updateProductTagUseCase.execute(params);
      case "delete_product_tag":
        return this.deleteProductTagUseCase.execute(params);

      // Reviews
      case "get_product_reviews":
        return this.getProductReviewsUseCase.execute(params);
      case "get_product_review":
        return this.getProductReviewUseCase.execute(params);
      case "create_product_review":
        return this.createProductReviewUseCase.execute(params);
      case "update_product_review":
        return this.updateProductReviewUseCase.execute(params);
      case "delete_product_review":
        return this.deleteProductReviewUseCase.execute(params);

      default:
        throw new Error(`Method ${method} not handled by ProductController`);
    }
  }
}
