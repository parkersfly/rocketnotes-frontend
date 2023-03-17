import { Container, Links, Content } from "./styles"

import { useState, useEffect } from "react"

import { Tag } from "../../components/Tag"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../../services/api"

export function Details(){
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  function handleBack(){
    navigate(-1)
  }

  async function handleNoteDelete(){
    const confirm = window.confirm("Deseja mesmo excluir a nota?")
    
    if(confirm){
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
    
  }

  useEffect(() => {
    async function getNotes(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    getNotes()

  }, [])

  return(
    <Container >
      <Header />

      {  data &&
      <main>
      <Content>
        <ButtonText title="Excluir nota" onClick={handleNoteDelete}/>

        <h1>
           {data.title}
        </h1>

        <p>{data.description}</p>

        {   data.links &&
        <Section title="Links úteis">
          <Links>
          {
            data.links.map(link => (
                <li key={String(link.id)}>
                  <a 
                  href={link.url}
                  target="_blank"
                  >
                    {link.url}</a>
                </li>
            ))
          }
          </Links>
        </Section>
        }

        { data.tags &&
        <Section title="Marcadores">
          {
            data.tags.map(tag => (
              <Tag 
              key={String(tag.id)}
              title ={tag.name}
              />
            ))
          }
        </Section>
        }

        <Button title="voltar" onClick={handleBack}/>
      </Content>
      </main>
        }
    </Container>
  )
}