import { Container, Form } from './styles'

import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'

import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { api } from '../../services/api'

export function New(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    const navigate = useNavigate()

    function handleBack(){
        navigate(-1)
      }

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter( link => link !== deleted))
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleAddNote(){

        if(!title){
            return alert("Dê um título a sua nota!")
        }

        if(newLink){
            return alert("Ops! Você esqueceu de adicionar o link.")
        }

        if(newTag){
            return alert("Ops! Você esqueceu de adicionar a tag.")
        }


        await api.post("/notes", {
            title,
            description,
            links,
            tags
        })

        alert("Nota criada com sucesso!")
        navigate(-1)
    }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title="Voltar" onClick={handleBack}/>
                    </header>

                    <Input 
                    placeholder="Título"
                    onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea 
                    placeholder="Observações" 
                    onChange={e => setDescription(e.target.value)}                   
                    />

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                key={String(index)}
                                value={link}
                                onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem 
                        isNew 
                        placeholder="Novo link"
                        value={newLink}
                        onChange={e => setNewLink(e.target.value)}
                        onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className='tags'>
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                    key={String(index)}
                                    value={tag}
                                    onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                        <NoteItem 
                            isNew 
                            placeholder="Nova tag"
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            onClick={handleAddTag}
                        />
                        </div>
                    </Section>

                    <Button title="Salvar" onClick={handleAddNote}/>
                </Form>
            </main>

        </Container>
    );
}