import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, signInWithEmail, signUpWithEmail, signOut } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogIn, LogOut, PackagePlus, Upload, Loader2, Home, UserPlus } from "lucide-react";
import { categories } from "@/data/products";

const PLATFORMS = ["Amazon", "Mercado Livre", "Shopee"];

const Admin = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [authEmail, setAuthEmail] = useState("");
    const [authPassword, setAuthPassword] = useState("");
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        original_price: "",
        image_url: "",
        category: categories[1],
        affiliate_link: "",
        brand: "",
        platform: PLATFORMS[0],
        rating: 5.0,
        reviews: 0
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signInWithEmail(authEmail, authPassword);
            toast.success("Bem-vindo de volta!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao entrar.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signUpWithEmail(authEmail, authPassword);
            toast.success("Conta criada! Verifique seu e-mail.");
        } catch (error: any) {
            toast.error(error.message || "Erro ao cadastrar.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('Você deve selecionar uma imagem para o upload.');
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            setFormData({ ...formData, image_url: publicUrl });
            toast.success("Imagem enviada com sucesso!");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase
                .from('products')
                .insert([formData]);

            if (error) throw error;

            toast.success("Produto cadastrado com sucesso!");
            setFormData({
                name: "",
                description: "",
                price: "",
                original_price: "",
                image_url: "",
                category: categories[1],
                affiliate_link: "",
                brand: "",
                platform: PLATFORMS[0],
                rating: 5.0,
                reviews: 0
            });
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !session) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Admin QPA</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="login">Entrar</TabsTrigger>
                                <TabsTrigger value="register">Criar Conta</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                    <Input
                                        type="email"
                                        placeholder="E-mail"
                                        required
                                        value={authEmail}
                                        onChange={(e) => setAuthEmail(e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Senha"
                                        required
                                        value={authPassword}
                                        onChange={(e) => setAuthPassword(e.target.value)}
                                    />
                                    <Button type="submit" disabled={loading} className="w-full">
                                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4 mr-2" />} Entrar
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="register">
                                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                                    <Input
                                        type="email"
                                        placeholder="E-mail"
                                        required
                                        value={authEmail}
                                        onChange={(e) => setAuthEmail(e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Senha (mín. 6 caracteres)"
                                        required
                                        value={authPassword}
                                        onChange={(e) => setAuthPassword(e.target.value)}
                                    />
                                    <Button type="submit" disabled={loading} className="w-full">
                                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" />} Criar Conta
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <Button variant="ghost" onClick={() => navigate("/")} className="mt-4 w-full">
                            <Home className="mr-2 h-4 w-4" /> Voltar para o site
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="font-display text-3xl font-bold">Painel QPA</h1>
                    <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" /> Sair
                    </Button>
                </div>

                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PackagePlus className="h-5 w-5 text-primary" /> Cadastrar Achado
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Nome do Produto</label>
                                <Input
                                    required
                                    placeholder="Ex: Monitor Gamer 24\"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Plataforma</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={formData.platform}
                                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                >
                                    {PLATFORMS.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Marca</label>
                                <Input
                                    required
                                    placeholder="Ex: Dell"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Categoria</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.filter(c => c !== "Todos").map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-medium">Descrição</label>
                                <Textarea
                                    required
                                    placeholder="Descrição da oferta..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Preço (Ex: R$ 890)</label>
                                <Input
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Preço Original (Opcional)</label>
                                <Input
                                    value={formData.original_price}
                                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-medium">Link da Oferta</label>
                                <Input
                                    required
                                    placeholder="URL de afiliado"
                                    value={formData.affiliate_link}
                                    onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-medium">Imagem do Produto</label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="flex-1"
                                    />
                                    {uploading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                                </div>
                                {formData.image_url && (
                                    <img src={formData.image_url} alt="Preview" className="mt-4 h-32 w-32 rounded-lg object-cover border border-border" />
                                )}
                            </div>

                            <Button type="submit" disabled={loading || uploading} className="md:col-span-2">
                                {loading ? "Salvando..." : "Cadastrar Achado"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Admin;
