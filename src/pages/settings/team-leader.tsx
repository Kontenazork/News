import { useState, useEffect, useCallback } from "react";
import { Settings, CompanyBranch, BusinessField, Product } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, X, Plus, Edit, Trash2, Building2 } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Badge
} from "@/components/ui/badge";
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

export default function TeamLeaderSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
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
      const settingsData = await mockDataService.getSettings();
      const branchesData = await mockDataService.getCompanyBranches();
      const productsData = await mockDataService.getProducts();
      setSettings(settingsData);
      setBranches(branchesData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load settings and branches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBasePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (settings) {
      setSettings({ ...settings, basePrompt: e.target.value });
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      await mockDataService.updateSettings(settings);
      toast({
        title: "Success",
        description: "Team Leader settings saved successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

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
    // Check if branch has products
    const branchProducts = products.filter(p => p.branchId === branchId);
    if (branchProducts.length > 0) {
      if (!confirm(`This branch has ${branchProducts.length} associated products. Deleting it will also delete all these products. Are you sure you want to continue?`)) {
        return;
      }
    } else {
      if (!confirm("Are you sure you want to delete this branch?")) {
        return;
      }
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

  const getBusinessFieldColor = (field: BusinessField) => {
    switch (field) {
      case "HPC":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Bitcoin":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Energy Storage":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleVectorDatabaseSettingChange = (
    field: keyof Settings['vectorDatabase'] | 'searchParameters',
    value: any,
    nestedField?: keyof Settings['vectorDatabase']['searchParameters']
  ) => {
    if (!settings) return;

    setSettings((prev) => {
      if (!prev) return prev;

      if (field === 'searchParameters' && nestedField) {
        return {
          ...prev,
          vectorDatabase: {
            ...prev.vectorDatabase,
            searchParameters: {
              ...prev.vectorDatabase.searchParameters,
              [nestedField]: value
            }
          }
        };
      }

      return {
        ...prev,
        vectorDatabase: {
          ...prev.vectorDatabase,
          [field]: value
        }
      };
    });
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Team Leader Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure the core base prompt, company context, and branches
        </p>
      </div>
      
      <Tabs defaultValue="prompt">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="prompt">Base Prompt</TabsTrigger>
          <TabsTrigger value="vector">Vector Search</TabsTrigger>
          <TabsTrigger value="branches">Company Branches</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompt" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Base Prompt</CardTitle>
              <CardDescription>
                Define the core prompt used for news curation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={settings.basePrompt}
                onChange={handleBasePromptChange}
                className="min-h-[200px]"
                placeholder="Enter your base prompt for news curation..."
              />
              <p className="text-sm text-muted-foreground mt-2">
                This prompt will be used as the foundation for all news curation. It should include the core objectives and focus areas.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleSaveSettings} 
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="vector" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Vector Search Configuration</CardTitle>
              <CardDescription>
                Configure vector database integration for semantic search refinement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Vector Search</Label>
                    <p className="text-sm text-muted-foreground">
                      Use semantic search to refine and improve search results
                    </p>
                  </div>
                  <Switch
                    checked={settings?.vectorDatabase?.enabled || false}
                    onCheckedChange={(checked) => 
                      handleVectorDatabaseSettingChange('enabled', checked)
                    }
                  />
                </div>

                {settings?.vectorDatabase?.enabled && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label>Vector Database Provider</Label>
                        <Select
                          value={settings.vectorDatabase.provider}
                          onValueChange={(value) => 
                            handleVectorDatabaseSettingChange('provider', value)
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pinecone">Pinecone</SelectItem>
                            <SelectItem value="weaviate">Weaviate</SelectItem>
                            <SelectItem value="qdrant">Qdrant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Vector Dimension</Label>
                        <Input
                          type="number"
                          value={settings.vectorDatabase.dimension}
                          onChange={(e) => 
                            handleVectorDatabaseSettingChange('dimension', parseInt(e.target.value))
                          }
                          className="mt-1"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          The dimension of the vectors used for semantic search
                        </p>
                      </div>

                      <div>
                        <Label>Search Parameters</Label>
                        <div className="space-y-4 mt-2">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">Top K Results</span>
                              <span className="text-sm font-medium">{settings.vectorDatabase.searchParameters.topK}</span>
                            </div>
                            <Slider
                              min={1}
                              max={100}
                              step={1}
                              value={[settings.vectorDatabase.searchParameters?.topK ?? 5]}
                              onValueChange={(value) => 
                                handleVectorDatabaseSettingChange('searchParameters', value[0], 'topK')
                              }
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">Minimum Score</span>
                              <span className="text-sm font-medium">{settings.vectorDatabase.searchParameters.minScore}</span>
                            </div>
                            <Slider
                              min={0}
                              max={1}
                              step={0.01}
                              value={[settings.vectorDatabase.searchParameters.minScore]}
                              onValueChange={(value) => 
                                handleVectorDatabaseSettingChange('searchParameters', value[0], 'minScore')
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label>Include Metadata</Label>
                            <Switch
                              checked={settings.vectorDatabase.searchParameters.includeMetadata}
                              onCheckedChange={(checked) => 
                                handleVectorDatabaseSettingChange('searchParameters', checked, 'includeMetadata')
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveSettings} 
                        disabled={saving}
                        className="flex items-center gap-2"
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Vector Settings
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
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
                View and manage company branches and their products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {branches.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No branches found. Add your first branch above.</p>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Branch Name</TableHead>
                          <TableHead>Business Field</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Products</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {branches.map((branch) => {
                          const branchProducts = products.filter(p => p.branchId === branch.id);
                          return (
                            <TableRow key={branch.id}>
                              <TableCell className="font-medium">{branch.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getBusinessFieldColor(branch.businessField)}>
                                  {branch.businessField}
                                </Badge>
                              </TableCell>
                              <TableCell>{branch.location}</TableCell>
                              <TableCell>
                                {branchProducts.length > 0 ? (
                                  <Badge variant="secondary">{branchProducts.length} products</Badge>
                                ) : (
                                  <span className="text-muted-foreground text-sm">No products</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
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
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products Management</CardTitle>
              <CardDescription>
                Add and manage products for your branches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-4">Add New Product</h3>
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
                    <div className="md:col-span-2 flex justify-end">
                      <Button 
                        onClick={handleAddProduct} 
                        disabled={saving}
                        className="flex items-center gap-2"
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                        Add Product
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Existing Products</h3>
                  {products.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No products found. Add your first product above.</p>
                  ) : (
                    <div className="border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Branch</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => {
                            const branch = branches.find(b => b.id === product.branchId);
                            return (
                              <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                  {branch ? (
                                    <div className="flex items-center gap-2">
                                      <span>{branch.name}</span>
                                      <Badge variant="outline" className={getBusinessFieldColor(branch.businessField)}>
                                        {branch.businessField}
                                      </Badge>
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">Unknown branch</span>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
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
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {saving && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Saving settings...</p>
          </div>
        </div>
      )}
    </div>
  );
}