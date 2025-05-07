import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { View, Text, ScrollView } from "react-native"

type Produto = {
  id: number
  nome: string
  valor: number
}

type Categoria = {
  id: number
  nome: string
  produtos: Produto[]
}

export default function CatalogoEmpresa() {
  const { empresaId } = useLocalSearchParams()
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    if (!empresaId) return

    async function carregarCatalogo() {
      try {
        const resp = await fetch(`http://localhost:3004/empresa/${empresaId}/catalogo`)
        const data = await resp.json()
        setCategorias(data.categorias)
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error)
      }
    }

    carregarCatalogo()
  }, [empresaId])

  return (
    <ScrollView style={{ padding: 16 }}>
      {categorias.map((cat) => (
        <View key={cat.id} style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>
            {cat.nome}
          </Text>
          {cat.produtos.map((prod) => (
            <Text key={prod.id}>• {prod.nome} - R$ {prod.valor.toFixed(2)}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  )
}
