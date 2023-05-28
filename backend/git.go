package backend

import (
	"errors"

	"github.com/go-git/go-git/v5"
)

type Git struct {
	fs *FS
}

func NewGit(fs *FS) *Git {
	return &Git{
		fs: fs,
	}
}

func (g *Git) Clone(url string, dir string) error {
	if g.fs.IsDirEmpty(dir) == false {
		return errors.New("Folder is not empty")
	}

	_, err := git.PlainClone(dir, false, &git.CloneOptions{
		URL: url,
	})

	return err
}
