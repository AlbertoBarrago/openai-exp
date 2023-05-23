import {Button, Modal} from "react-daisyui";

export const AskModal = ({isOpen, setIsOpen, action, args}) => {
    return (
        <>
            <div className="font-sans">
                <Modal {...args} open={isOpen}>
                    <Modal.Header className="font-bold">
                        {args.title}
                    </Modal.Header>

                    <Modal.Body>
                        {args.description}
                    </Modal.Body>

                    <Modal.Actions>
                        <Button onClick={() => {
                            setIsOpen(false)
                            action(false)
                        }}>Nope</Button>
                        <Button onClick={() => {
                            setIsOpen(false)
                            action(true)
                        }}>Yay!</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    )
}