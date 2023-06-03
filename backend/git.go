package backend

import (
	"errors"
	"os/exec"
	"strings"
	"unicode"
)

type Git struct {
	gitPath string
}

func NewGit(gitPath string) *Git {
	return &Git{
		gitPath: gitPath,
	}
}

func (g *Git) Clone(url string, dir string) error {
	cmd := exec.Command(g.gitPath, "clone", url, dir)
	stdout, stderr := cmd.CombinedOutput()

	if cmd.ProcessState == nil {
		return parseStdErr(stderr)
	}

	if cmd.ProcessState.Success() {
		return nil
	}

	return parseStdOut(stdout)
}

func parseStdErr(stderr error) error {
	str := stderr.Error()
	trimmed := strings.ReplaceAll(str, "exec: ", "")
	return errors.New(capitalize(trimmed))
}

func parseStdOut(stdout []byte) error {
	trimmed := strings.TrimSuffix(string(stdout), "\n")
	arr := strings.Split(trimmed, "fatal: ")
	err := arr[len(arr)-1]

	return errors.New(capitalize(err))
}

func capitalize(str string) string {
	runes := []rune(str)
	runes[0] = unicode.ToUpper(runes[0])
	return string(runes)
}
