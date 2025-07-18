import { useState } from 'react';
import axios from 'axios'; // Import axios
import { Upload, FileText, Link as LinkIcon, Zap, Download, Code, Brain, Cpu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';

const Generator = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [framework, setFramework] = useState('pytorch');
  const [llm, setLlm] = useState('openai');
  const [apiKey, setApiKey] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File uploaded",
        description: `${selectedFile.name} is ready for processing`,
      });
    }
  };

  const handleProcess = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: `Please enter your ${llm.toUpperCase()} API key`,
        variant: "destructive"
      });
      return;
    }

    if (!url && !file) {
      toast({
        title: "Input Required",
        description: "Please provide a URL or upload a PDF file",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create FormData object
      const formData = new FormData();

      // Determine the endpoint and add data accordingly
      let endpoint = '';
      if (file) {
        formData.append('file', file); // For PDF file upload
        endpoint = 'http://0.0.0.0:8001/process_pdf';
      } else {
        formData.append('url', url); // For URL-based processing
        endpoint = 'http://0.0.0.0:8001/process_url';
      }

      // Add framework, LLM, and API key
      formData.append('framework', framework);
      formData.append('llm', llm);
      formData.append('api_key', apiKey);

      // Send data to backend using axios
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Ensure correct content type
        }
      });

      // Handle the response
      const { text, formulas, image_analysis, code } = response.data;

      setResults({
        text,
        formulas,
        code,
        imageAnalysis: image_analysis
      });

      toast({
        title: "Processing Complete!",
        description: "Your code has been generated successfully",
      });
    } catch (error) {
      console.error("Error processing request:", error);

      toast({
        title: "Processing Failed",
        description: error.response?.data?.detail || "An error occurred while processing your request",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 mesh-bg">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              AI Research Paper Code Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform research papers into working machine learning code using advanced AI agents
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Settings Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glow-card sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="framework">Framework</Label>
                    <Select value={framework} onValueChange={setFramework}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pytorch">PyTorch</SelectItem>
                        <SelectItem value="tensorflow">TensorFlow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="llm">AI Model</Label>
                    <Select value={llm} onValueChange={setLlm}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI GPT</SelectItem>
                        <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                        <SelectItem value="grok">Grok AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder={`Enter ${llm.toUpperCase()} API Key`}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Main Content */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card className="glow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Input
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="url" className="space-y-6">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url" className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4" />
                          URL
                        </TabsTrigger>
                        <TabsTrigger value="upload" className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Upload PDF
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="url" className="space-y-4">
                        <div>
                          <Label htmlFor="url">Research Paper URL</Label>
                          <Input
                            id="url"
                            placeholder="https://arxiv.org/abs/... "
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="upload" className="space-y-4">
                        <div>
                          <Label htmlFor="file">Upload PDF</Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <input
                              id="file"
                              type="file"
                              accept=".pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <label htmlFor="file" className="cursor-pointer">
                              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground">
                                {file ? file.name : "Click to upload PDF or drag and drop"}
                              </p>
                            </label>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    <Button 
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="w-full btn-3d mt-6"
                    >
                      {isProcessing ? (
                        <>
                          <div className="spline-loader mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Generate Code
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
                {/* Results Section */}
                <Card className="glow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <Tabs defaultValue="code" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="code">Code</TabsTrigger>
                          <TabsTrigger value="text">Text</TabsTrigger>
                          <TabsTrigger value="formulas">Formulas</TabsTrigger>
                        </TabsList>
                        <TabsContent value="code" className="space-y-4">
                          <div className="relative">
                            <pre className="code-block p-4 overflow-x-auto text-sm">
                              <code>{results.code}</code>
                            </pre>
                            <Button 
                              size="sm" 
                              className="absolute top-2 right-2"
                              onClick={() => navigator.clipboard.writeText(results.code)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="text" className="space-y-4">
                          <Textarea
                            value={results.text}
                            readOnly
                            rows={8}
                            className="resize-none"
                          />
                        </TabsContent>
                        <TabsContent value="formulas" className="space-y-4">
                          {results.formulas.map((formula: string, index: number) => (
                            <div key={index} className="p-4 code-block">
                              <code className="text-sm">{formula}</code>
                            </div>
                          ))}
                        </TabsContent>
                      </Tabs>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Cpu className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Upload a paper or enter a URL to get started</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Generator;