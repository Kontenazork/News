
import { useState, useEffect, useCallback } from "react";
import { CompanyBranch, BusinessField, Product } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, X, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BranchesSettingsPage() {
  const [branches, setBranches] = useState<CompanyBranch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // New branch form state
  const [newBranch, setNewBranch] = useState<Omit<CompanyBranch, "id" | "products">>({
    name: "",
    description: "",
    location: "",
    businessField: "HPC"
  });

  // New product form state
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    branchId: ""
  });

  // Edit branch state
  const [editingBranch, setEditingBranch] = useState<CompanyBranch | null>(null);

  // Edit product state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const branchesData = await mockDataService.getCompanyBranches();
      const productsData = await mockDataService.getProducts();
      setBranches(branchesData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load branches and products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddBranch = async () => {
    if (!newBranch.name || !newBranch.description || !newBranch.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      await mockDataService.addCompanyBranch(newBranch);
      await fetchData();
      setNewBranch({
        name: "",
        description: "",
        location: "",
        businessField: "HPC"
      });
      toast({
        title: "Success",
        description: "Branch added successfully.",
      });
    } catch (error) {
      console.error("Error adding branch:", error);
      toast({
        title: "Error",
        description: "Failed to add branch. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateBranch = async () => {
    if (!editingBranch) return;

    setSaving(true);
    try {
      await mockDataService.updateCompanyBranch(editingBranch);
      await fetchData();
      setEditingBranch(null);
      toast({
        title: "Success",
        description: "Branch updated successfully.",
      });
    } catch (error) {
      console.error("Error updating branch:", error);
      toast({
        title: "Error",
        description: "Failed to update branch. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBranch = async (branchId: string) => {
    if (!confirm("Are you sure you want to delete this branch? This will also delete all associated products.")) {
      return;
    }

    setSaving(true);
    try {
      await mockDataService.deleteCompanyBranch(branchId);
      await fetchData();
      toast({
        title: "Success",
        description: "Branch deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting branch:", error);
      toast({
        title: "Error",
        description: "Failed to delete branch. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.branchId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      await mockDataService.addProduct(newProduct);
      await fetchData();
      setNewProduct({
        name: "",
        description: "",
        branchId: ""
      });
      toast({
        title: "Success",
        description: "Product added successfully.",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    setSaving(true);
    try {
      await mockDataService.updateProduct(editingProduct);
      await fetchData();
      setEditingProduct(null);
      toast({
        title: "Success",
        description: "Product updated successfully.",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setSaving(true);
    try {
      await mockDataService.deleteProduct(productId);
      await fetchData();
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading branches and products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Company Branches</h1>
        <p className="text-muted-foreground mt-1">
          Manage company branches and their associated products
        </p>
      </div>
      
      <Tabs defaultValue="branches">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Branch</CardTitle>
              <CardDescription>
                Create a new company branch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="branch-name">Branch Name</Label>
                  <Input
                    id="branch-name"
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                    placeholder="Enter branch name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="branch-location">Location</Label>
                  <Input
                    id="branch-location"
                    value={newBranch.location}
                    onChange={(e) => setNewBranch({...newBranch, location: e.target.value})}
                    placeholder="City, Country"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="branch-description">Description</Label>
                  <Input
                    id="branch-description"
                    value={newBranch.description}
                    onChange={(e) => setNewBranch({...newBranch, description: e.target.value})}
                    placeholder="Brief description of the branch"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="branch-field">Business Field</Label>
                  <Select
                    value={newBranch.businessField}
                    onValueChange={(value) => setNewBranch({...newBranch, businessField: value as BusinessField})}
                  >
                    <SelectTrigger id="branch-field" className="mt-1">
                      <SelectValue placeholder="Select business field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HPC">HPC</SelectItem>
                      <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                      <SelectItem value="Energy Storage">Energy Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleAddBranch} 
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Add Branch
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Branches</CardTitle>
              <CardDescription>
                View and manage company branches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {branches.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No branches found. Add your first branch above.</p>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {branches.map((branch) => (
                      <AccordionItem key={branch.id} value={branch.id}>
                        <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
                          <div className="flex items-center gap-2 text-left">
                            <span className="font-medium">{branch.name}</span>
                            <span className="text-xs text-muted-foreground">({branch.businessField})</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4">
                          <div className="space-y-4 pt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-xs text-muted-foreground">Location</Label>
                                <p>{branch.location}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Business Field</Label>
                                <p>{branch.businessField}</p>
                              </div>
                              <div className="md:col-span-2">
                                <Label className="text-xs text-muted-foreground">Description</Label>
                                <p>{branch.description}</p>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-xs text-muted-foreground">Products</Label>
                              {branch.products && branch.products.length > 0 ? (
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                  {branch.products.map((product) => (
                                    <li key={product.id}>{product.name}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground mt-1">No products associated with this branch.</p>
                              )}
                            </div>
                            
                            <div className="flex justify-end gap-2 pt-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => setEditingBranch({...branch})}
                                  >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Branch</DialogTitle>
                                    <DialogDescription>
                                      Update branch information
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  {editingBranch && (
                                    <div className="grid grid-cols-1 gap-4 py-4">
                                      <div>
                                        <Label htmlFor="edit-branch-name">Branch Name</Label>
                                        <Input
                                          id="edit-branch-name"
                                          value={editingBranch.name}
                                          onChange={(e) => setEditingBranch({...editingBranch, name: e.target.value})}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-branch-location">Location</Label>
                                        <Input
                                          id="edit-branch-location"
                                          value={editingBranch.location}
                                          onChange={(e) => setEditingBranch({...editingBranch, location: e.target.value})}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-branch-description">Description</Label>
                                        <Input
                                          id="edit-branch-description"
                                          value={editingBranch.description}
                                          onChange={(e) => setEditingBranch({...editingBranch, description: e.target.value})}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-branch-field">Business Field</Label>
                                        <Select
                                          value={editingBranch.businessField}
                                          onValueChange={(value) => setEditingBranch({...editingBranch, businessField: value as BusinessField})}
                                        >
                                          <SelectTrigger id="edit-branch-field" className="mt-1">
                                            <SelectValue placeholder="Select business field" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="HPC">HPC</SelectItem>
                                            <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                                            <SelectItem value="Energy Storage">Energy Storage</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  )}
                                  
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button 
                                        onClick={handleUpdateBranch}
                                        disabled={saving}
                                      >
                                        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                        Save Changes
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="destructive" 
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => handleDeleteBranch(branch.id)}
                                disabled={saving}
                              >
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                Delete
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>
                Create a new product for a company branch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="product-branch">Branch</Label>
                  <Select
                    value={newProduct.branchId}
                    onValueChange={(value) => setNewProduct({...newProduct, branchId: value})}
                  >
                    <SelectTrigger id="product-branch" className="mt-1">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name} ({branch.businessField})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Input
                    id="product-description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Brief description of the product"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleAddProduct} 
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Add Product
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Products</CardTitle>
              <CardDescription>
                View and manage products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No products found. Add your first product above.</p>
                ) : (
                  <div className="divide-y">
                    {products.map((product) => {
                      const branch = branches.find(b => b.id === product.branchId);
                      return (
                        <div key={product.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.description}</p>
                              {branch && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Branch: {branch.name} ({branch.businessField})
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => setEditingProduct({...product})}
                                  >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                    <DialogDescription>
                                      Update product information
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  {editingProduct && (
                                    <div className="grid grid-cols-1 gap-4 py-4">
                                      <div>
                                        <Label htmlFor="edit-product-name">Product Name</Label>
                                        <Input
                                          id="edit-product-name"
                                          value={editingProduct.name}
                                          onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-product-branch">Branch</Label>
                                        <Select
                                          value={editingProduct.branchId}
                                          onValueChange={(value) => setEditingProduct({...editingProduct, branchId: value})}
                                        >
                                          <SelectTrigger id="edit-product-branch" className="mt-1">
                                            <SelectValue placeholder="Select branch" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {branches.map((branch) => (
                                              <SelectItem key={branch.id} value={branch.id}>
                                                {branch.name} ({branch.businessField})
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-product-description">Description</Label>
                                        <Input
                                          id="edit-product-description"
                                          value={editingProduct.description}
                                          onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                  )}
                                  
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button 
                                        onClick={handleUpdateProduct}
                                        disabled={saving}
                                      >
                                        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                        Save Changes
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="destructive" 
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => handleDeleteProduct(product.id)}
                                disabled={saving}
                              >
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {saving && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Saving changes...</p>
          </div>
        </div>
      )}
    </div>
  );
}
