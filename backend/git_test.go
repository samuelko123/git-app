package backend

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const DEFAULT_URL = "https://github.com/go-git/go-git.git"

func TestClone_HappyPath(t *testing.T) {
	git := NewGit("git")
	dir := getTempEmptyDir()

	err := git.Clone(DEFAULT_URL, dir)

	assert.Nil(t, err)
}

func TestClone_NonEmptyDir(t *testing.T) {
	git := NewGit("git")
	dir := getTempNonEmptyDir(t)

	err := git.Clone(DEFAULT_URL, dir)

	assert.EqualError(t, err, "Destination path '"+dir+"' already exists and is not an empty directory.")
}

func TestClone_GitNotFound(t *testing.T) {
	dir := getTempEmptyDir()
	git := NewGit("no-git")

	err := git.Clone(DEFAULT_URL, dir)

	assert.EqualError(t, err, "\"no-git\": executable file not found in %PATH%")
}

func getTempEmptyDir() string {
	return filepath.Join(os.TempDir(), uuid.NewString())
}

func getTempNonEmptyDir(t *testing.T) string {
	dir := getTempEmptyDir()
	err := os.Mkdir(dir, os.ModePerm)
	require.Nil(t, err)
	err = os.Mkdir(filepath.Join(dir, uuid.NewString()), os.ModePerm)
	require.Nil(t, err)
	return dir
}
