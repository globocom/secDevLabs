package types

// Note holds all information related to a note.
type Note struct {
	OwnerUsername string `json:"username"`
	Title         string `json:"title"`
	Content       string `json:"content"`
}

// UserNotes holds all user notes
type UserNotes []Note
