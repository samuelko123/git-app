package backend

import (
	"io"
	"os"
)

type FS struct {
}

func NewFS() *FS {
	return &FS{}
}

func (f *FS) GetUserHomeDir() (string, error) {
	return os.UserHomeDir()
}

func (f *FS) IsDirEmpty(name string) bool {
	folder, err := os.Open(name)
	if err != nil {
		return true
	}
	defer folder.Close()

	_, err = folder.Readdir(1)

	if err == io.EOF {
		return true
	}
	return false
}
