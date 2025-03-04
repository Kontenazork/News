
import { useState, useEffect, useCallback } from "react";
import { DatabaseSchema, DatabaseField } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, X, Plus, Edit, Trash2, Code } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DatabaseSettingsPage() {
  const [schema, setSchema] = useState<DatabaseSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // New field form state
  const [newField, setNewField] = useState<Omit<DatabaseField, "id">>({
    name: "",
    type: "string",
    isRequired: false,
    description: ""
  });

  // Edit field state
  const [editingField, setEditingField] = useState<DatabaseField | null>(null);

  // JSON preview
  const [jsonPreview, setJsonPreview] = useState<string>("");

  const fetchSchema = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockDataService.getDatabaseSchema();
      setSchema(data);
      generateJsonPreview(data);
    } catch (error) {
      console.error("Error fetching database schema:", error);
      toast({
        title: "Error",
        description: "Failed to load database schema. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSchema();
  }, [fetchSchema]);

  const generateJsonPreview = (schemaData: DatabaseSchema) => {
    // Create a sample article object based on the schema
    const sampleArticle: Record<string, any> = {};
    
    schemaData.fields.forEach(field => {
      if (field.name === "id") {
        sampleArticle[field.name] = "article-123";
      } else if (field.name === "title") {
        sampleArticle[field.name] = "Sample Article Title";
      } else if (field.name === "content") {
        sampleArticle[field.name] = "This is a sample article content...";
      } else if (field.name === "source") {
        sampleArticle[field.name] = "Sample News Source";
      } else if (field.name === "sourceUrl") {
        sampleArticle[field.name] = "https://example.com/article";
      } else if (field.name === "publicationDate") {
        sampleArticle[field.name] = new Date().toISOString();
      } else if (field.name === "imageUrl") {
        sampleArticle[field.name] = "https://example.com/image.jpg";
      } else if (field.name === "relevanceScores") {
        sampleArticle[field.name] = {
          technical: 4.5,
          business: 4.2,
          sustainability: 3.8,
          overall: 4.3
        };
      } else if (field.name === "businessField") {
        sampleArticle[field.name] = "HPC";
      } else if (field.name === "keyInnovations") {
        sampleArticle[field.name] = [
          "Innovation 1",
          "Innovation 2"
        ];
      } else if (field.name === "actionableInsights") {
        sampleArticle[field.name] = [
          "Insight 1",
          "Insight 2"
        ];
      } else {
        // Generic value based on type
        switch (field.type) {
          case "string":
            sampleArticle[field.name] = "Sample string value";
            break;
          case "number":
            sampleArticle[field.name] = 123;
            break;
          case "boolean":
            sampleArticle[field.name] = true;
            break;
          case "array":
            sampleArticle[field.name] = ["Item 1", "Item 2"];
            break;
          case "object":
            sampleArticle[field.name] = { key: "value" };
            break;
          case "date":
            sampleArticle[field.name] = new Date().toISOString();
            break;
          default:
            sampleArticle[field.name] = null;
        }
      }
    });
    
    // Format the JSON based on schema settings
    const jsonOptions = schemaData.formatOptions.prettyPrint ? 2 : 0;
    let jsonString = JSON.stringify(sampleArticle, null, jsonOptions);
    
    // If includeNulls is false, we need to filter out null values
    // This is a simplified approach - in a real app, you'd want to handle this more robustly
    if (!schemaData.formatOptions.includeNulls) {
      const obj = JSON.parse(jsonString);
      const filtered = Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v != null)
      );
      jsonString = JSON.stringify(filtered, null, jsonOptions);
    }
    
    setJsonPreview(jsonString);
  };

  const handleAddField = async () => {
    if (!schema || !newField.name) {
      toast({
        title: "Validation Error",
        description: "Please provide at least a field name.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      await mockDataService.addDatabaseField(newField);
      await fetchSchema();
      setNewField({
        name: "",
        type: "string",
        isRequired: false,
        description: ""
      });
      toast({
        title: "Success",
        description: "Field added successfully.",
      });
    } catch (error) {
      console.error("Error adding field:", error);
      toast({
        title: "Error",
        description: "Failed to add field. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateField = async () => {
    if (!editingField) return;

    setSaving(true);
    try {
      await mockDataService.updateDatabaseField(editingField);
      await fetchSchema();
      setEditingField(null);
      toast({
        title: "Success",
        description: "Field updated successfully.",
      });
    } catch (error) {
      console.error("Error updating field:", error);
      toast({
        title: "Error",
        description: "Failed to update field. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteField = async (fieldId: string) => {
    if (!confirm("Are you sure you want to delete this field?")) {
      return;
    }

    setSaving(true);
    try {
      await mockDataService.deleteDatabaseField(fieldId);
      await fetchSchema();
      toast({
        title: "Success",
        description: "Field deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting field:", error);
      toast({
        title: "Error",
        description: "Failed to delete field. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFormatOptionChange = async (key: keyof DatabaseSchema["formatOptions"], value: boolean) => {
    if (!schema) return;
    
    const updatedSchema = {
      ...schema,
      formatOptions: {
        ...schema.formatOptions,
        [key]: value
      }
    };
    
    setSaving(true);
    try {
      await mockDataService.updateDatabaseSchema(updatedSchema);
      await fetchSchema();
      toast({
        title: "Success",
        description: "Format options updated successfully.",
      });
    } catch (error) {
      console.error("Error updating format options:", error);
      toast({
        title: "Error",
        description: "Failed to update format options. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleOutputFormatChange = async (value: "json" | "csv" | "xml") => {
    if (!schema) return;
    
    const updatedSchema = {
      ...schema,
      outputFormat: value
    };
    
    setSaving(true);
    try {
      await mockDataService.updateDatabaseSchema(updatedSchema);
      await fetchSchema();
      toast({
        title: "Success",
        description: "Output format updated successfully.",
      });
    } catch (error) {
      console.error("Error updating output format:", error);
      toast({
        title: "Error",
        description: "Failed to update output format. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !schema) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading database settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Database Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure database schema and output format
        </p>
      </div>
      
      <Tabs defaultValue="fields">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="fields">Database Fields</TabsTrigger>
          <TabsTrigger value="output">Output Format</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fields" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Field</CardTitle>
              <CardDescription>
                Create a new field for the database schema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="field-name">Field Name</Label>
                  <Input
                    id="field-name"
                    value={newField.name}
                    onChange={(e) => setNewField({...newField, name: e.target.value})}
                    placeholder="Enter field name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="field-type">Field Type</Label>
                  <Select
                    value={newField.type}
                    onValueChange={(value) => setNewField({...newField, type: value as any})}
                  >
                    <SelectTrigger id="field-type" className="mt-1">
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                      <SelectItem value="array">Array</SelectItem>
                      <SelectItem value="object">Object</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="field-required"
                    checked={newField.isRequired}
                    onCheckedChange={(checked) => setNewField({...newField, isRequired: checked})}
                  />
                  <Label htmlFor="field-required">Required Field</Label>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="field-description">Description</Label>
                  <Input
                    id="field-description"
                    value={newField.description}
                    onChange={(e) => setNewField({...newField, description: e.target.value})}
                    placeholder="Brief description of the field"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleAddField} 
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Add Field
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Fields</CardTitle>
              <CardDescription>
                Manage fields in the database schema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schema.fields.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No fields found. Add your first field above.
                        </TableCell>
                      </TableRow>
                    ) : (
                      schema.fields.map((field) => (
                        <TableRow key={field.id}>
                          <TableCell className="font-medium">{field.name}</TableCell>
                          <TableCell>{field.type}</TableCell>
                          <TableCell>{field.isRequired ? "Yes" : "No"}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{field.description}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => setEditingField({...field})}
                                  >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Field</DialogTitle>
                                    <DialogDescription>
                                      Update field information
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  {editingField && (
                                    <div className="grid grid-cols-1 gap-4 py-4">
                                      <div>
                                        <Label htmlFor="edit-field-name">Field Name</Label>
                                        <Input
                                          id="edit-field-name"
                                          value={editingField.name}
                                          onChange={(e) => setEditingField({...editingField, name: e.target.value})}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-field-type">Field Type</Label>
                                        <Select
                                          value={editingField.type}
                                          onValueChange={(value) => setEditingField({...editingField, type: value as any})}
                                        >
                                          <SelectTrigger id="edit-field-type" className="mt-1">
                                            <SelectValue placeholder="Select field type" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="string">String</SelectItem>
                                            <SelectItem value="number">Number</SelectItem>
                                            <SelectItem value="boolean">Boolean</SelectItem>
                                            <SelectItem value="array">Array</SelectItem>
                                            <SelectItem value="object">Object</SelectItem>
                                            <SelectItem value="date">Date</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Switch
                                          id="edit-field-required"
                                          checked={editingField.isRequired}
                                          onCheckedChange={(checked) => setEditingField({...editingField, isRequired: checked})}
                                        />
                                        <Label htmlFor="edit-field-required">Required Field</Label>
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-field-description">Description</Label>
                                        <Input
                                          id="edit-field-description"
                                          value={editingField.description}
                                          onChange={(e) => setEditingField({...editingField, description: e.target.value})}
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
                                        onClick={handleUpdateField}
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
                                onClick={() => handleDeleteField(field.id)}
                                disabled={saving}
                              >
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="output" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Output Format</CardTitle>
              <CardDescription>
                Configure how data is formatted for output
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="output-format" className="mb-2 block">Format Type</Label>
                  <Select
                    value={schema.outputFormat}
                    onValueChange={(value) => handleOutputFormatChange(value as "json" | "csv" | "xml")}
                  >
                    <SelectTrigger id="output-format">
                      <SelectValue placeholder="Select output format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Choose the format for data output. JSON is recommended for most use cases.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Format Options</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pretty-print-toggle">Pretty Print</Label>
                    <Switch
                      id="pretty-print-toggle"
                      checked={schema.formatOptions.prettyPrint}
                      onCheckedChange={(checked) => handleFormatOptionChange("prettyPrint", checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Format the output with indentation and line breaks for better readability.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-nulls-toggle">Include Null Values</Label>
                    <Switch
                      id="include-nulls-toggle"
                      checked={schema.formatOptions.includeNulls}
                      onCheckedChange={(checked) => handleFormatOptionChange("includeNulls", checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Include fields with null values in the output. If disabled, null fields will be omitted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>JSON Preview</CardTitle>
              <CardDescription>
                Preview of how the data will be formatted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
                <pre className="text-xs font-mono">
                  {jsonPreview}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                This is a sample preview based on your current schema and format settings.
              </p>
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
